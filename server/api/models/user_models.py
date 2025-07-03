from typing import Optional, TYPE_CHECKING
from datetime import datetime, timezone
from uuid import UUID as uuid, uuid4
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, VARCHAR, Text, TIMESTAMP, UUID

if TYPE_CHECKING:
  from .brand_metadata import Profile

class CreateUpdateDate(SQLModel):
  created_at: Optional[datetime] = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
  updated_at: Optional[datetime] = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))

class UsersBase(SQLModel):
  user_id: str = Field(sa_column=Column(VARCHAR, unique=True))

class UsersId(SQLModel):
  id: Optional[uuid] = Field(sa_column=Column(UUID, primary_key=True), default_factory=lambda: uuid4())

class Users(CreateUpdateDate, UsersBase, UsersId, table=True):
  __tablename__ = 'users'
  students: Optional["Profile"] = Relationship(back_populates="users")

class Login(UsersBase):
  pass