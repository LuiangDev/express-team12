from typing import Optional, TYPE_CHECKING
from uuid import UUID as uuid, uuid4
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, VARCHAR, Text, UUID

if TYPE_CHECKING:
  from .user_models import Users

class Profile(SQLModel, table=True):
    __tablename__ = 'profiles'
    id: Optional[uuid] = Field(sa_column=Column(UUID, primary_key=True), default_factory=lambda: uuid4())
    name: str = Field(sa_column=Column(VARCHAR), description='Business name')
    mission: str = Field(sa_column=Column(Text), description='Business mission')
    tone: str = Field(sa_column=Column(VARCHAR), description='Communication tone')
    story: str = Field(sa_column=Column(Text), description='Business story')
    products: str = Field(sa_column=Column(Text), description='Products/services (JSON list)')
    values: str = Field(sa_column=Column(Text), description='Business values (JSON list)')
    faqs: str = Field(sa_column=Column(Text), description='FAQs (JSON list)')
    email_examples: str = Field(sa_column=Column(Text), description='Email examples (JSON list)')
    user_id: Optional[uuid] = Field(foreign_key="users.id")
    user: Optional["Users"] = Relationship(back_populates="profiles")