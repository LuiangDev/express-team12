from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, VARCHAR, Text
from uuid import UUID as uuid

if TYPE_CHECKING:
  from .embedding_models import EmbeddingsBase

class Profile(SQLModel, table=True):
    __tablename__ = 'profiles'
    id: Optional[uuid] = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column(VARCHAR), description='Business name')
    mission: str = Field(sa_column=Column(Text), description='Business mission')
    tone: str = Field(sa_column=Column(VARCHAR), description='Communication tone')
    story: str = Field(sa_column=Column(Text), description='Business story')
    products: str = Field(sa_column=Column(Text), description='Products/services (JSON list)')
    values: str = Field(sa_column=Column(Text), description='Business values (JSON list)')
    faqs: str = Field(sa_column=Column(Text), description='FAQs (JSON list)')
    email_examples: str = Field(sa_column=Column(Text), description='Email examples (JSON list)')
    embeddings: List["EmbeddingsBase"] = Relationship(back_populates="profile")
