from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os

from db_config import create_db_and_tables
from routes import profile_route, email_router

load_dotenv()

FRONTEND_URL = os.getenv('FRONTEND_URL')

app = FastAPI(lifespan=create_db_and_tables)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[FRONTEND_URL],
  allow_credentials=True,
  allow_methods=["HEAD", "GET", "POST", "PUT", "DELETE"],
  allow_headers=["*"],
)

app.include_router(profile_route)
app.include_router(email_router)

if __name__ == "__main__":
  environment = os.getenv("ENVIRONMENT")
  uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=3000,
    reload=(environment == "development"),
    use_colors=True
  )