from fastapi import APIRouter, Depends, HTTPException, status
from uuid import UUID
from typing import Annotated, List

# Importaciones de modelos y servicios
from services.email_service import EmailService
from models.email_models import (
    EmailType,
    WelcomeEmailData,
    PromotionEmailData,
    SupportReplyEmailData # Asumiendo que has añadido este modelo
)

# Definimos etiquetas para agrupar endpoints en la UI de Swagger
router = APIRouter(
    prefix="/emails",
    tags=["Email Generation"]
)

# Dependencia para inyectar el servicio de email
def get_email_service():
    return EmailService()

EmailServiceDep = Annotated[EmailService, Depends(get_email_service)]

# --- Modelo para la respuesta de email ---
class EmailResponse(BaseModel):
    email_content: str

# --- Endpoint para generar un email de bienvenida ---
@router.post(
    "/generate/welcome/{profile_id}",
    response_model=EmailResponse,
    summary="Generate a Welcome Email",
    description=(
        "Generates a personalized welcome email for a new user. "
        "This endpoint performs a semantic search using the user's details to find relevant context "
        "from the business profile (e.g., mission, values) to create a more engaging email."
    ),
    responses={
        404: {"description": "Profile ID not found during context search"}
    }
)
async def generate_welcome_email_endpoint(
    profile_id: UUID,
    email_data: WelcomeEmailData,
    service: EmailServiceDep
) -> EmailResponse:
    """
    Generates a welcome email with semantic context.

    - **profile_id**: The UUID of the business profile to use for context.
    - **email_data**: User-specific data for personalizing the welcome message.
    - **service**: The email generation service dependency.

    Returns the generated email content.
    """
    # El query para la búsqueda semántica se construye a partir de los datos del usuario
    query_for_context = f"Información de bienvenida para un nuevo usuario de {email_data.country} interesado en {', '.join(email_data.interests)}"
    # Las categorías son fijas para este tipo de email, buscando la información más relevante
    categories_for_context = ["mission", "values", "story", "onboarding"] # 'onboarding' podría ser otra categoría

    try:
        generated_email = await service.generate_email_with_context(
            email_type=EmailType.WELCOME,
            data=email_data.model_dump(),
            profile_id=profile_id,
            query=query_for_context,
            categories=categories_for_context,
            limit=5 # Un límite razonable para el contexto
        )
        return EmailResponse(email_content=generated_email)
    except ValueError as e:
        # Esto podría ocurrir si el ProfileEmbeddingService no encuentra el perfil
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


# --- Endpoint para generar un email de promoción ---
@router.post(
    "/generate/promotion/{profile_id}",
    response_model=EmailResponse,
    summary="Generate a Promotional Email",
    description=(
        "Generates a promotional email for a specific product. "
        "It performs a semantic search to gather context about the product being promoted, "
        "related products, and successful case studies to create a persuasive message."
    ),
    responses={
        404: {"description": "Profile ID not found during context search"}
    }
)
async def generate_promotion_email_endpoint(
    profile_id: UUID,
    email_data: PromotionEmailData,
    service: EmailServiceDep
) -> EmailResponse:
    """
    Generates a promotional email with semantic context.

    - **profile_id**: The UUID of the business profile to use for context.
    - **email_data**: Promotion-specific data like product name and discount.
    - **service**: The email generation service dependency.

    Returns the generated email content.
    """
    query_for_context = f"Argumentos de venta y detalles sobre el producto: {email_data.product_name}"
    categories_for_context = ["products", "faqs", "story"] # Buscar en productos y FAQs relacionadas

    try:
        generated_email = await service.generate_email_with_context(
            email_type=EmailType.PROMOTION,
            data=email_data.model_dump(),
            profile_id=profile_id,
            query=query_for_context,
            categories=categories_for_context,
            limit=5
        )
        return EmailResponse(email_content=generated_email)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))