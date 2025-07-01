from fastapi import APIRouter, Body, status

from models import email_models

router = APIRouter(
  tags=['Email'],
  prefix='/email',
)

@router.get('')
def hello():
  return { "message": "Hello World!" }

@router.post(
  '/generate', 
  summary="Generate an email", 
  status_code=status.HTTP_201_CREATED,
  response_model=email_models.EmailBase,
)
def generate_email(body: email_models.CreateEmail = Body()):
  return body