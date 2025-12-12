import cloudinary
import cloudinary.api
from dotenv import load_dotenv
import os

load_dotenv()

def setup_cloudinary_preset():
    # Configure Cloudinary
    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET")
    )
    
    try:
        # Create unsigned upload preset with metadata preservation
        preset = cloudinary.api.create_upload_preset(
            name="optic_gov_raw",
            unsigned=True,
            folder="optic-gov-evidence",
            video_metadata=True,
            image_metadata=True,
            # No transformations to preserve metadata
            transformation=[]
        )
        
        print("SUCCESS: Cloudinary preset 'optic_gov_raw' created successfully!")
        print(f"Folder: optic-gov-evidence")
        print(f"Unsigned uploads: Enabled")
        print(f"GPS metadata preservation: Enabled")
        print(f"Preset name: {preset['name']}")
        
    except Exception as e:
        if "already exists" in str(e):
            print("SUCCESS: Cloudinary preset 'optic_gov_raw' already exists!")
        else:
            print(f"ERROR creating preset: {e}")

if __name__ == "__main__":
    setup_cloudinary_preset()