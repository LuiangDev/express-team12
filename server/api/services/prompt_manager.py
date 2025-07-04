# services/prompt_manager.py
from langchain.prompts import PromptTemplate
from models.email_models import EmailType

# --- PROMPT PARA EMAIL DE BIENVENIDA ---
WELCOME_PROMPT_TEMPLATE = (
    "Eres un asistente que redacta emails corporativos.\n\n"
    "Contexto de la empresa extraído semánticamente:\n{contexto}\n\n"
    "Redacta un email de bienvenida {length} y {tone} para un nuevo usuario llamado {name} que es de {country} con la ocupación {occupation} y tiene estos intereses: {interests}. "
    "Si se proporciona un mensaje adicional, inclúyelo: {message}. Si no, ignóralo. "
    "El email debe terminar invitando al usuario a explorar la plataforma."
)

WELCOME_PROMPT = PromptTemplate(
    input_variables=["length", "tone", "name", "country", "occupation", "interests", "message", "contexto"],
    template=WELCOME_PROMPT_TEMPLATE
)

# --- PROMPT PARA EMAIL DE PROMOCIÓN ---
PROMOTION_PROMPT_TEMPLATE = (
    "Eres un asistente de marketing experto en redacción de emails promocionales.\n\n"
    "Contexto de la empresa y productos:\n{contexto}\n\n"
    "Redacta un email de promoción {length} y {tone} para {user_name}. "
    "El objetivo es promocionar nuestro producto: '{product_name}' con un descuento especial del {discount}. "
    "Incluye el siguiente mensaje si se proporciona: {message}. "
    "El email debe ser persuasivo y terminar con una clara llamada a la acción."
)

PROMOTION_PROMPT = PromptTemplate(
    input_variables=["length", "tone", "user_name", "product_name", "discount", "message", "contexto"],
    template=PROMOTION_PROMPT_TEMPLATE
)

# --- REGISTRO CENTRAL DE PROMPTS ---
# Este diccionario mapea un EmailType a su PromptTemplate correspondiente.
EMAIL_PROMPTS = {
    EmailType.WELCOME: WELCOME_PROMPT,
    EmailType.PROMOTION: PROMOTION_PROMPT,
    # Añade aquí el prompt para EmailType.SUPPORT_REPLY cuando lo crees
}

def get_prompt(email_type: EmailType) -> PromptTemplate:
    """Devuelve el PromptTemplate para un tipo de email dado."""
    prompt = EMAIL_PROMPTS.get(email_type)
    if not prompt:
        raise ValueError(f"No se encontró un prompt para el tipo de email: {email_type}")
    return prompt