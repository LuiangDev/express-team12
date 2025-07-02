from fastapi import FastAPI, Depends
from typing import Annotated
from contextlib import asynccontextmanager
from sqlmodel import create_engine, SQLModel, Session
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

@asynccontextmanager
async def create_db_and_tables(app: FastAPI):
  SQLModel.metadata.create_all(engine)
  yield

def get_session():
  with Session(engine) as session:
    try:
      yield session
    finally:
      session.close()

DatabaseDep = Annotated[Session, Depends(get_session)]