from fastapi import APIRouter, Body, status
from fastapi.responses import StreamingResponse

from models.email_models import CreateEmail
from services.email_service import EmailService

import io

router = APIRouter(
  tags=['Email'],
  prefix='/email',
)

email_service = EmailService()

@router.get('')
def hello():
  return { "message": "Hello World!" }

@router.post(
  '/generate', 
  summary="Generate an email", 
  status_code=status.HTTP_201_CREATED,
)
def generate_email(body: CreateEmail = Body()):
  email = email_service.generate_email(body)
  response = StreamingResponse(email)
  return response