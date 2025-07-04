# services/profile_embedding_service.py (Nuevo Archivo)

import json
from uuid import UUID
from sqlmodel import Session, select
from typing import List, Dict, Any

from db_config import engine
from models.profile_models import Profile # Asumo que tu modelo se llama así
from models.embedding_models import EmbeddingsBase
from services.embedding_service import generate_embedding # Tu función existente

class ProfileEmbeddingService:
    # Definimos qué campos son texto simple y cuáles son listas JSON
    SIMPLE_TEXT_FIELDS = ["mission", "tone", "story"]
    JSON_LIST_FIELDS = ["products", "values", "faqs", "email_examples"]

    async def sync_profile_embeddings(self, profile_id: UUID):
        """
        Elimina los embeddings antiguos de un perfil y genera los nuevos
        a partir de los campos de texto y las listas JSON.
        Esta es una operación "idempotente".
        """
        with Session(engine) as session:
            # 1. Obtener el perfil
            profile = session.get(Profile, profile_id)
            if not profile:
                raise ValueError(f"Perfil con id {profile_id} no encontrado.")

            # 2. Eliminar todos los embeddings existentes para este perfil para evitar duplicados
            existing_embeddings = session.exec(
                select(EmbeddingsBase).where(EmbeddingsBase.profile_id == profile_id)
            ).all()
            for emb in existing_embeddings:
                session.delete(emb)
            
            # Lista para almacenar los nuevos objetos de embedding
            new_embeddings: List[EmbeddingsBase] = []

            # 3. Procesar campos de texto simple
            for field_name in self.SIMPLE_TEXT_FIELDS:
                text_content = getattr(profile, field_name)
                if text_content:
                    embedding_vector = generate_embedding(text_content)
                    new_embeddings.append(
                        EmbeddingsBase(
                            profile_id=profile_id,
                            category=field_name,
                            text=text_content,
                            embeddings=embedding_vector
                        )
                    )

            # 4. Procesar campos de lista JSON
            for field_name in self.JSON_LIST_FIELDS:
                items = getattr(profile, field_name)
                if not items or not isinstance(items, list):
                    continue
                for item_text in items:
                    # Asumimos que la lista contiene strings.
                    # Si contiene objetos (ej. FAQs con "pregunta" y "respuesta"),
                    # necesitarías formatear el texto aquí.
                    # Ejemplo para FAQs: text_to_embed = f"P: {item['pregunta']} R: {item['respuesta']}"
                    if not isinstance(item_text, str) or not item_text:
                        continue
                    embedding_vector = generate_embedding(item_text)
                    new_embeddings.append(
                        EmbeddingsBase(
                            profile_id=profile_id,
                            category=field_name, # La categoría es el nombre del campo (ej. "products")
                            text=item_text,     # El texto es el elemento individual
                            embeddings=embedding_vector
                        )
                    )

            # 5. Guardar todos los nuevos embeddings en la base de datos
            session.add_all(new_embeddings)
            session.commit()
            print(f"Sincronizados {len(new_embeddings)} embeddings para el perfil {profile_id}")