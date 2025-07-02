from pydantic import BaseModel
from enum import Enum as PyEnum
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Enum, TIMESTAMP, Text, INT, VARCHAR
from datetime import datetime, timezone
from uuid import UUID as uuid

class EmailLength(str, PyEnum):
  SHORT = 'pequeño'
  MEDIUM = 'medio'
  LONG = 'largo'

class EmailBase(SQLModel):
  type: str = Field(sa_column=Column(VARCHAR), description='The email type')
  tone: str = Field(sa_column=Column(VARCHAR), description='Set the tone of the email')
  length: EmailLength = Field(sa_column=Column(Enum(EmailLength)), description='How long the email will be')
  message: str = Field(sa_column=Column(Text), description='The content that the email will communicate')

class ReceiverBase(SQLModel):
  name: str = Field(sa_column=Column(VARCHAR), description='The name of the receiver')
  age: int = Field(sa_column=Column(INT), description='The age of the receiver')
  country: str = Field(sa_column=Column(VARCHAR), description='Where the receiver come from')
  email: str = Field(sa_column=Column(VARCHAR), description='The email of the receiver')
  ocçupation: str = Field(sa_column=Column(VARCHAR), description='Occupation of the receiver')

class IdModel(SQLModel):
  id: uuid = Field(default=None, primary_key=True)

class Timestamp(SQLModel):
  created_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))

class Receiver(Timestamp, ReceiverBase, IdModel, table=True):
  __tablename__ = 'receivers'

class CreateEmail(EmailBase):
  pass

class Email(SQLModel, table=True):
  __tablename__ = 'emails'
  id: uuid = Field(default=None, primary_key=True)
  message: str = Field(sa_column=Column(Text))