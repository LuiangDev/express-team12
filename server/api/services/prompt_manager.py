# services/prompt_manager.py
from langchain.prompts import PromptTemplate
from models.email_validation_models import EmailType

# =========================================================================
#  NUEVO PROMPT DE BIENVENIDA (MUCHO MÁS EXPLÍCITO)
# =========================================================================
WELCOME_PROMPT_TEMPLATE = """
### TAREA ###
Tu única tarea es generar únicamente el cuerpo (body) de un email corporativo de bienvenida, listo para enviar.
NO uses placeholders como [Nombre], [Empresa], etc. Utiliza la información proporcionada para rellenar todos los detalles.
El resultado final debe ser únicamente el body del email, sin asunto, notas, comentarios ni texto introductorio.

### CONTEXTO DE LA EMPRESA (Extraído semánticamente) ###
{contexto}

### DATOS DEL EMAIL Y DEL DESTINATARIO ###
- Tono del email: {tone}
- Longitud del email: {length}
- Nombre del destinatario: {name}
- País del destinatario: {country}
- Ocupación del destinatario: {occupation}
- Intereses del destinatario: {interests}

### MENSAJE ADICIONAL OBLIGATORIO ###
{message}
(Si el mensaje anterior está vacío o dice 'None', ignora este punto por completo. No escribas nada sobre él).

### INSTRUCCIONES FINALES ###
1. Redacta el email usando el tono y la longitud especificados.
2. Personaliza el contenido usando los datos del destinatario y el contexto de la empresa.
3. Integra de forma natural el "Mensaje Adicional Obligatorio" si existe.
4. Concluye siempre el email invitando al usuario a explorar la plataforma.
5. El resultado debe ser solo el body del email, sin asunto ni encabezados.

### EMAIL GENERADO ###
"""

WELCOME_PROMPT = PromptTemplate(
    input_variables=["length", "tone", "name", "country", "occupation", "interests", "message", "contexto"],
    template=WELCOME_PROMPT_TEMPLATE
)

# ... (puedes aplicar la misma estructura a tus otros prompts como el de promoción) ...

PROMOTION_PROMPT_TEMPLATE = """
### TAREA ###
Tu única tarea es generar únicamente el cuerpo (body) de un email corporativo de promoción, listo para enviar.
NO uses placeholders. Utiliza la información proporcionada para rellenar todos los detalles.
El resultado final debe ser únicamente el body del email, sin asunto, notas, comentarios ni texto introductorio.

### CONTEXTO DE LA EMPRESA Y PRODUCTOS ###
{contexto}

### DATOS DEL EMAIL PROMOCIONAL ###
- Tono del email: {tone}
- Longitud del email: {length}
- Nombre del destinatario: {user_name}
- Producto a promocionar: {product_name}
- Descuento ofrecido: {discount}

### MENSAJE ADICIONAL OBLIGATORIO ###
{message}
(Si el mensaje anterior está vacío o dice 'None', ignóralo por completo).

### INSTRUCCIONES FINALES ###
1. Redacta un email persuasivo usando el tono y la longitud especificados.
2. El objetivo es que el usuario aproveche la promoción del producto.
3. Concluye siempre con una llamada a la acción clara.
4. El resultado debe ser solo el body del email, sin asunto ni encabezados.

### EMAIL GENERADO ###
"""

PROMOTION_PROMPT = PromptTemplate(
    input_variables=["length", "tone", "user_name", "product_name", "discount", "message", "contexto"],
    template=PROMOTION_PROMPT_TEMPLATE
)


# --- REGISTRO CENTRAL DE PROMPTS ---
EMAIL_PROMPTS = {
    EmailType.WELCOME: WELCOME_PROMPT,
    EmailType.PROMOTION: PROMOTION_PROMPT,
}

def get_prompt(email_type: EmailType) -> PromptTemplate:
    prompt = EMAIL_PROMPTS.get(email_type)
    if not prompt:
        raise ValueError(f"No se encontró un prompt para el tipo de email: {email_type}")
    return prompt