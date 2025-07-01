from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os

from routes import llm_route

load_dotenv()

FRONTEND_URL = os.getenv('FRONTEND_URL')

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=[FRONTEND_URL],
  allow_credentials=True,
  allow_methods=["HEAD", "GET", "POST", "PUT", "DELETE"],
  allow_headers=["*"],
)

app.include_router(llm_route.router)

if __name__ == "__main__":
  environment = os.getenv("ENVIRONMENT")
  uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=3000,
    reload=(environment == "development"),
    use_colors=True
  )