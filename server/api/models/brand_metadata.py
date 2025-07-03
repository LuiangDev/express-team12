
from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, VARCHAR, Text

class Profile(SQLModel, table=True):
    __tablename__ = 'profiles'
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column(VARCHAR), description='Business name')
    mission: str = Field(sa_column=Column(Text), description='Business mission')
    tone: str = Field(sa_column=Column(VARCHAR), description='Communication tone')
    story: str = Field(sa_column=Column(Text), description='Business story')
    products: str = Field(sa_column=Column(Text), description='Products/services (JSON list)')
    values: str = Field(sa_column=Column(Text), description='Business values (JSON list)')
    faqs: str = Field(sa_column=Column(Text), description='FAQs (JSON list)')
    email_examples: str = Field(sa_column=Column(Text), description='Email examples (JSON list)')
