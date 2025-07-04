# api/routes/profile_router.py
from fastapi import APIRouter, HTTPException, status, Depends, BackgroundTasks
from uuid import UUID
from sqlmodel import select

# Modelos y servicios con el nuevo diseño
from models.profile_models import Profile, ProfileCreate, ProfileUpdate 
from db_config import DatabaseDep
from services.profile_embedding_service import ProfileEmbeddingService

router = APIRouter(
    tags=["Profile"],
    prefix="/profile",
)

# --- Endpoint para crear ---
@router.post(
    "/",
    response_model=Profile,
    status_code=status.HTTP_201_CREATED,
    summary="Crear o reemplazar el perfil de la PyME"
)
def create_or_replace_profile(
    profile_data: ProfileCreate, # Usamos el modelo Pydantic para validación y Swagger
    session: DatabaseDep,
    background_tasks: BackgroundTasks,
):
    # --- Lógica para sobrescribir el perfil existente manteniendo la misma id ---
    old_profile = session.exec(select(Profile)).first()
    if old_profile:
        update_data = profile_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(old_profile, key, value)
        session.add(old_profile)
        session.commit()
        session.refresh(old_profile)
        embedding_service = ProfileEmbeddingService()
        background_tasks.add_task(embedding_service.sync_profile_embeddings, old_profile.id)
        return old_profile
    else:
        # --- Lógica original: eliminar y crear uno nuevo (descomentar para usar con auth multiusuario) ---
        # old_profile = session.exec(select(Profile)).first()
        # if old_profile:
        #     session.delete(old_profile)
        #     session.commit()
        # new_profile = Profile.model_validate(profile_data)
        # session.add(new_profile)
        # session.commit()
        # session.refresh(new_profile)
        # embedding_service = ProfileEmbeddingService()
        # background_tasks.add_task(embedding_service.sync_profile_embeddings, new_profile.id)
        # return new_profile
        # -------------------------------------------------------------
        new_profile = Profile.model_validate(profile_data)
        session.add(new_profile)
        session.commit()
        session.refresh(new_profile)
        embedding_service = ProfileEmbeddingService()
        background_tasks.add_task(embedding_service.sync_profile_embeddings, new_profile.id)
        return new_profile

# --- Endpoint para actualizar ---
@router.put(
    "/",
    response_model=Profile,
    summary="Actualizar parcialmente el perfil de la PyME"
)
def update_profile(
    profile_update: ProfileUpdate, # Modelo con todos los campos opcionales
    session: DatabaseDep,
    background_tasks: BackgroundTasks,
):
    db_profile = session.exec(select(Profile)).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found. Please create one first using POST.")

    update_data = profile_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_profile, key, value)
        
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)

    # Re-sincroniza en segundo plano después de la actualización
    embedding_service = ProfileEmbeddingService()
    background_tasks.add_task(embedding_service.sync_profile_embeddings, db_profile.id)

    return db_profile