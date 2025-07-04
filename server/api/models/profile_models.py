from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, VARCHAR, Text, JSON
from uuid import UUID as uuid
import uuid as py_uuid

if TYPE_CHECKING:
  from .embedding_models import EmbeddingsBase

class Profile(SQLModel, table=True):
    __tablename__ = 'profiles'
    id: Optional[uuid] = Field(default_factory=py_uuid.uuid4, primary_key=True)
    name: str = Field(sa_column=Column(VARCHAR), description='Business name')
    mission: str = Field(sa_column=Column(Text), description='Business mission')
    tone: str = Field(sa_column=Column(VARCHAR), description='Communication tone')
    story: str = Field(sa_column=Column(Text), description='Business story')
    products: Optional[List[str]] = Field(default=None, sa_column=Column(JSON), description='Products/services (JSON list)')
    values: Optional[List[str]] = Field(default=None, sa_column=Column(JSON), description='Business values (JSON list)')
    faqs: Optional[List[str]] = Field(default=None, sa_column=Column(JSON), description='FAQs (JSON list)')
    email_examples: Optional[List[str]] = Field(default=None, sa_column=Column(JSON), description='Email examples (JSON list)')
    embeddings: List["EmbeddingsBase"] = Relationship(back_populates="profile")

class ProfileCreate(SQLModel):
    # Hereda los campos pero permite recibir listas directamente
    name: str
    mission: str
    tone: str
    story: str
    # FastAPI validará que estos campos sean listas de strings
    products: List[str]
    values: List[str]
    faqs: List[str]
    email_examples: List[str]
    
# =================================================================
#  MODELO PARA ACTUALIZACIÓN (Lo que la API espera en un PUT/PATCH)
# =================================================================
class ProfileUpdate(SQLModel):
    # Todos los campos son opcionales para permitir actualizaciones parciales
    name: Optional[str] = None
    mission: Optional[str] = None
    tone: Optional[str] = None
    story: Optional[str] = None
    products: Optional[List[str]] = None
    values: Optional[List[str]] = None
    faqs: Optional[List[str]] = None
    email_examples: Optional[List[str]] = None