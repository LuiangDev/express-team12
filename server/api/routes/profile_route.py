from fastapi import APIRouter, HTTPException, status, Body, Depends
from sqlmodel import select
from db_config import DatabaseDep
from clerk_config import AuthDep
import json

from models.brand_metadata import Profile
from models.user_models import Users

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
def get_profile(session: DatabaseDep, auth: AuthDep):
    user_id = auth.payload['sub']
    user_found = session.exec(select(Users).where(Users.user_id == user_id)).first()
    profile = session.exec(select(Profile).where(Profile.user_id == user_found.id)).first()
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
    auth: AuthDep,
    body: dict = Body(...)
):
    user_id = auth.payload['sub']
    user_found = session.exec(select(Users).where(Users.user_id == user_id)).first()
    for key in ["products", "values", "faqs", "email_examples", "user_id"]:
        if key in body:
            body[key] = json.dumps(body[key])
    body["user_id"] = user_found.id
    profile = Profile(**body)
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile



@router.put(
    "",
    response_model=Profile,
    summary="Actualizar perfil de la PyME",
    description="Actualiza el perfil existente de la PyME."
)
def update_profile(
    session: DatabaseDep,
    auth: AuthDep,
    body: dict = Body(...)
):
    user_id = auth.payload['sub']
    user_found = session.exec(select(Users).where(Users.user_id == user_id)).first()
    profile = session.exec(select(Profile).where(Profile.user_id == user_found.id)).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    for key, value in body.items():
        if key in ["products", "values", "faqs", "email_examples"]:
            value = json.dumps(value)
        setattr(profile, key, value)
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile
