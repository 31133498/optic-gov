from database import Base, engine
from dotenv import load_dotenv
import os

load_dotenv()

def create_tables():
    print(f"Connecting to: {os.getenv('DATABASE_URL')[:50]}...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")

if __name__ == "__main__":
    create_tables()