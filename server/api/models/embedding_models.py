from typing import Optional, List, TYPE_CHECKING
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from sqlmodel import SQLModel, Field, Relationship, Column, VARCHAR, TEXT, TIMESTAMP, UUID
from pgvector.sqlalchemy import Vector

if TYPE_CHECKING:
  from .profile_models import Profile

class EmbeddingsBase(SQLModel,  table=True):
    __tablename__ = 'embeddings'
    id: Optional[uuid] =  Field(default_factory=uuid4, sa_column=Column(UUID, primary_key=True))
    embeddings: List[float] = Field(default=None, sa_column=Column(Vector(1024)))
    category: str = Field(default=None, sa_column=Column(VARCHAR))
    text: str = Field(default=None, sa_column=Column(TEXT))
    created_at: Optional[datetime] = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
    profile_id: uuid = Field(foreign_key="profiles.id")
    profile: Optional["Profile"] = Relationship(back_populates="embeddings")