from fastapi import APIRouter, HTTPException, status, Body, Depends
from sqlmodel import select
from models.brand_metadata import Profile
from models.embedding_models import EmbeddingsBase
from db_config import DatabaseDep
import json
from uuid import uuid4

from services.embedding_service import generate_embedding

router = APIRouter(
    tags=["Profile"],
    prefix="/profile",
)

@router.get(
    "",
    response_model=Profile,
    summary="Obtener perfil de la PyME",
    description="Devuelve el perfil de la PyME si existe."
)
def get_profile(session: DatabaseDep):
    profile = session.exec(select(Profile)).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile



@router.post(
    "",
    response_model=Profile,
    status_code=status.HTTP_201_CREATED,
    summary="Crear perfil de la PyME",
    description="Crea un nuevo perfil de PyME. Solo debe existir uno por base de datos."
)
def create_profile(
    session: DatabaseDep,
    body: dict = Body(...)
):
    profile_id = uuid4()
    for key in ["id", "products", "values", "faqs", "email_examples"]:
        if key in body:
            body[key] = json.dumps(body[key])
    body["id"] = profile_id
    profile = Profile(**body)
    session.add(profile)
    session.commit()
    session.refresh(profile)

    embed_categories = ["mission","tone","story","values","products","faqs","email_examples"]
    for category in embed_categories:
        profile_data = session.exec(select(Profile).where(profile.id == profile_id)).first()
        text_val = getattr(profile_data, category) if profile else None
        if not text_val:
            continue
        text_str = ", ".join(text_val) if isinstance(text_val, list) else text_val
        embedded_vector = generate_embedding(text_str)
        emb = EmbeddingsBase(
            profile_id=profile_id,
            category=category,
            text=text_str,
            embeddings=embedded_vector
        )
        session.add(emb)
        session.commit()
        session.refresh(emb)

    return { "message": "Successfully created" }

@router.put(
    "",
    response_model=Profile,
    summary="Actualizar perfil de la PyME",
    status_code=status.HTTP_201_CREATED,
    description="Actualiza el perfil existente de la PyME.",
)
def update_profile(
    session: DatabaseDep,
    body: dict = Body(...)
):
    profile = session.exec(select(Profile)).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    for key, value in body.items():
        if key in ["products", "values", "faqs", "email_examples"]:
            value = json.dumps(value)
        setattr(profile, key, value)
    session.add(profile)
    session.commit()
    session.refresh(profile)

    embed_categories = ["mission","tone","story","values","products","faqs","email_examples"]
    for category in embed_categories:
        profile_data = session.exec(select(Profile).where(profile.id == profile.id)).first()
        text_val = getattr(profile_data, category) if profile else None
        if not text_val:
            continue
        text_str = ", ".join(text_val) if isinstance(text_val, list) else text_val
        embedded_vector = generate_embedding(text_str)
        emb = EmbeddingsBase(
            profile_id=profile.id,
            category=category,
            text=text_str,
            embeddings=embedded_vector
        )
        session.add(emb)
        session.commit()
        session.refresh(emb)

    return { "message": "Successfully created" }
