from fastapi import APIRouter, status
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from api.services.welcome_email_service import WelcomeEmailService

router = APIRouter(
  tags=['Email'],
  prefix='/email',
)



class UserData(BaseModel):
    nombre: str
    pais: str
    intereses: str

service = WelcomeEmailService()


@router.post(
    "/generate",
    summary="Generate a personalized welcome email",
    status_code=status.HTTP_201_CREATED,
)
def generar_bienvenida(user: UserData):
    email = service.generar_email(user.nombre, user.pais, user.intereses)
    return {"email": email}