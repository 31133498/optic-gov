from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import google.generativeai as genai
from web3 import Web3
import os
from dotenv import load_dotenv
import json
from sqlalchemy.orm import Session
from database import get_db, Contractor, Project, Milestone
from auth import hash_password, verify_password, create_access_token, verify_token
from typing import List, Optional

load_dotenv()

app = FastAPI(title="Optic-Gov AI Oracle")

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash-exp')

# Configure Web3
w3 = Web3(Web3.HTTPProvider(os.getenv("SEPOLIA_RPC_URL")))
private_key = os.getenv("ETHEREUM_PRIVATE_KEY")
contract_address = os.getenv("CONTRACT_ADDRESS")

class ContractorRegister(BaseModel):
    wallet_address: str
    company_name: str
    email: str
    password: str

class ContractorLogin(BaseModel):
    email: str
    password: str

class VerificationRequest(BaseModel):
    video_url: str
    milestone_criteria: str
    project_id: int

class ProjectCreate(BaseModel):
    name: str
    description: str
    total_budget: float
    contractor_wallet: str
    use_ai_milestones: bool
    manual_milestones: Optional[List[str]] = None

class MilestoneGenerate(BaseModel):
    project_description: str
    total_budget: float

class VerificationResponse(BaseModel):
    verified: bool
    confidence_score: int
    reasoning: str

@app.post("/register")
async def register_contractor(contractor: ContractorRegister, db: Session = Depends(get_db)):
    if db.query(Contractor).filter(Contractor.email == contractor.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(contractor.password)
    db_contractor = Contractor(
        wallet_address=contractor.wallet_address,
        company_name=contractor.company_name,
        email=contractor.email,
        password_hash=hashed_password
    )
    db.add(db_contractor)
    db.commit()
    return {"message": "Contractor registered successfully"}

@app.post("/login")
async def login_contractor(login: ContractorLogin, db: Session = Depends(get_db)):
    contractor = db.query(Contractor).filter(Contractor.email == login.email).first()
    if not contractor or not verify_password(login.password, contractor.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": contractor.wallet_address})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/generate-milestones")
async def generate_milestones(request: MilestoneGenerate):
    prompt = f"""You are a construction project manager. Generate 4-6 specific, measurable milestones for this project:

Project: {request.project_description}
Budget: ${request.total_budget:,.2f}

Return ONLY a JSON array of milestone descriptions:
["milestone 1", "milestone 2", "milestone 3"]

Each milestone should be:
- Specific and measurable
- Verifiable through video evidence
- Logical construction sequence"""
    
    response = model.generate_content(prompt)
    milestones = json.loads(response.text)
    return {"milestones": milestones}

@app.post("/create-project")
async def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    contractor = db.query(Contractor).filter(Contractor.wallet_address == project.contractor_wallet).first()
    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")
    
    # Create project
    db_project = Project(
        name=project.name,
        description=project.description,
        total_budget=project.total_budget,
        contractor_id=contractor.id,
        ai_generated=project.use_ai_milestones
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    # Create milestones
    if project.use_ai_milestones:
        # Generate AI milestones
        ai_response = await generate_milestones(MilestoneGenerate(
            project_description=project.description,
            total_budget=project.total_budget
        ))
        milestone_descriptions = ai_response["milestones"]
    else:
        milestone_descriptions = project.manual_milestones
    
    # Create milestone records
    milestone_amount = project.total_budget / len(milestone_descriptions)
    for i, desc in enumerate(milestone_descriptions):
        milestone = Milestone(
            project_id=db_project.id,
            description=desc,
            amount=milestone_amount,
            order_index=i + 1
        )
        db.add(milestone)
    
    db.commit()
    return {"project_id": db_project.id, "milestones_created": len(milestone_descriptions)}

@app.post("/verify-milestone", response_model=VerificationResponse)
async def verify_milestone(request: VerificationRequest, wallet_address: str = Depends(verify_token)):
    try:
        # Gemini prompt for construction verification
        prompt = f"""You are an expert civil engineer and strict auditor. Your job is to verify construction milestones from video footage. You must be skeptical.

Milestone Description: {request.milestone_criteria}

Task: Analyze the video frames. Does the visual evidence CONCLUSIVELY prove this milestone is complete?

Return ONLY a JSON object:
{{
"verified": boolean,
"confidence_score": integer (0-100),
"reasoning": "string (max 1 sentence explaining why)"
}}"""

        # Upload video and analyze
        video_file = genai.upload_file(request.video_url)
        response = model.generate_content([prompt, video_file])
        
        # Parse Gemini response
        result = json.loads(response.text)
        
        # If verified, trigger blockchain transaction
        if result["verified"] and result["confidence_score"] >= 95:
            await release_funds(request.project_id)
        
        return VerificationResponse(**result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def release_funds(project_id: int):
    """Trigger smart contract to release milestone funds"""
    try:
        # Contract ABI (minimal for releaseMilestone function)
        contract_abi = [
            {
                "inputs": [
                    {"name": "_projectId", "type": "uint256"},
                    {"name": "_verdict", "type": "bool"}
                ],
                "name": "releaseMilestone",
                "outputs": [],
                "type": "function"
            }
        ]
        
        contract = w3.eth.contract(address=contract_address, abi=contract_abi)
        account = w3.eth.account.from_key(private_key)
        
        # Build transaction
        transaction = contract.functions.releaseMilestone(project_id, True).build_transaction({
            'from': account.address,
            'gas': 100000,
            'gasPrice': w3.to_wei('20', 'gwei'),
            'nonce': w3.eth.get_transaction_count(account.address)
        })
        
        # Sign and send
        signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        
        return tx_hash.hex()
        
    except Exception as e:
        print(f"Blockchain transaction failed: {e}")

@app.get("/health")
async def health_check():
    return {"status": "AI Oracle is watching"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)