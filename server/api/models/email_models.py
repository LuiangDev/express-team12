from pydantic import BaseModel, Field
from enum import Enum

class Tone(str, Enum):
  FORMAL = "formal"
  CASUAL = "casual"

class EmailType(str, Enum):
  WELCOME = "bienvenida"

class EmailLength(str, Enum):
  SHORT = 'pequeño'
  MEDIUM = 'medio'
  LONG = 'largo'
  

class EmailBase(BaseModel):
  type: EmailType = Field(
    description='The email type',
    examples=[EmailType.WELCOME]    
  )
  tone: Tone = Field(
    description='Set the tone of the email',
    examples=[Tone.FORMAL]
  )
  length: EmailLength = Field(
    description='How long the email will be', 
    examples=[EmailLength.SHORT]
  )
  message: str = Field(
    description='The content that the email will communicate',
  )

class ReceiverBase(BaseModel):
  name: str = Field(
    description='The email type',
    examples=['normal@email.com']    
  )
  age: int = Field(
    description='The email type',
    examples=['normal@email.com']    
  )
  country: str = Field(
    description='The email type',
    examples=['normal@email.com']    
  )
  email: str

class CreateEmail(EmailBase):
  pass