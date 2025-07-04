# models/email_models.py
from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum

# 1. Enum para los tipos de email
class EmailType(str, Enum):
    WELCOME = "welcome"
    PROMOTION = "promotion"
    SUPPORT_REPLY = "support_reply"
    # Añade más tipos aquí en el futuro

# 2. Modelo base con campos comunes
class EmailDataBase(BaseModel):
    tone: str = Field(..., description="Tono del email (ej. 'formal', 'amigable')")
    length: str = Field(..., description="Longitud del email (ej. 'corto', 'detallado')")
    message: Optional[str] = Field(None, description="Mensaje específico a incluir en el email.")
    
# 3. Modelos específicos para cada tipo de email
class WelcomeEmailData(EmailDataBase):
    name: str
    country: str
    occupation: str
    interests: List[str]

class PromotionEmailData(EmailDataBase):
    product_name: str
    discount: str
    user_name: str
    
class SupportReplyEmailData(EmailDataBase):
    user_name: str
    ticket_id: str
    support_agent_name: str

# El antiguo CreateEmail ya no es necesario o puede ser reemplazado por estos.
# Si lo usas en la API, puedes tener un modelo que contenga el tipo y los datos.
class CreateEmailRequest(BaseModel):
    email_type: EmailType
    data: dict # Los datos se validarán en la capa de servicio o API