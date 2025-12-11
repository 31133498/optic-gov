# Optic-Gov Backend - AI Oracle

The AI Oracle service that bridges video verification with blockchain payments.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. Run the service:
```bash
python run.py
```

## API Endpoints

- `POST /verify-milestone` - Analyze video and trigger payment if verified
- `GET /health` - Health check

## Flow

1. Contractor uploads video to IPFS
2. Frontend calls `/verify-milestone` with video URL and criteria
3. Gemini 2.5 Flash analyzes the video
4. If verified (95%+ confidence), triggers smart contract payment
5. Returns verification result to frontend