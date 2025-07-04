from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.chains.llm import LLMChain
import os
from typing import List, Dict, Any
from uuid import UUID
from sqlmodel import Session, select

# Importaciones de nuestros nuevos módulos
from models.email_validation_models import EmailType
from services.prompt_manager import get_prompt
from services.embedding_service import generate_embedding
from db_config import engine
from models.embedding_models import EmbeddingsBase


load_dotenv()
GROQ_API_KEY=os.getenv("GROQ_API_KEY")

class EmailService:
  def __init__(self):
    self.llm = ChatGroq(
      api_key=GROQ_API_KEY,
      model="llama3-70b-8192", # Recomiendo usar un modelo más reciente como Llama3
      temperature=0.1, # Un poco de temperatura puede dar mejores resultados
      max_tokens=None,
      timeout=None,
      max_retries=2
      # Ya no necesitamos prompts ni chains aquí
    )
    
  def generate_email(self, email_type: EmailType, data: Dict[str, Any], contexto: List[Dict] = None) -> str:
    """
    Genera un email de un tipo específico usando los datos proporcionados.
    Este método ahora es genérico.
    """
    # 1. Obtener el prompt template correcto
    prompt_template = get_prompt(email_type)
    
    # 2. Formatear el contexto para el prompt
    contexto_str = ""
    if contexto:
      for item in contexto:
        contexto_str += f"- {item['category']}: {item['text']}\n"
    else:
      contexto_str = "No se proporcionó contexto adicional."
        
    # 3. Preparar las variables para el prompt
    prompt_vars = data.copy()
    prompt_vars["contexto"] = contexto_str
    
    # 4. Crear y ejecutar la cadena dinámicamente
    llm_chain = prompt_template | self.llm
    response = llm_chain.invoke(prompt_vars)
    
    # El nuevo `ChatGroq` devuelve un `AIMessage` cuyo contenido está en `response.content`
    return str(response.content)

  async def generate_email_with_context(
      self, 
      email_type: EmailType, 
      data: Dict[str, Any],
      profile_id: UUID, 
      query: str, 
      categories: List[str], 
      limit: int = 5
  ) -> str:
    """
    Busca contexto semántico y luego genera un email del tipo especificado.
    """
    contexto = await self.search_similar_content(profile_id, query, categories, limit)
    return self.generate_email(email_type, data, contexto)

   # Esta función ahora funciona para ambos tipos de categorías sin cambios.
  async def search_similar_content(self, profile_id: UUID, query: str, categories: List[str], limit: int = 5) -> List[dict]:
    """
    Busca contenido similar en las categorías especificadas usando embeddings.
    Ahora funciona correctamente para categorías que son listas (como "products")
    o texto simple (como "mission").
    """
    query_embedding = generate_embedding(query)
    results = []
    
    # Hemos optimizado esta parte ligeramente
    with Session(engine) as session:
        # Construimos un statement que busca en todas las categorías deseadas a la vez.
        # Es más eficiente que hacer un bucle y múltiples queries.
        stmt = (
            select(EmbeddingsBase.category, EmbeddingsBase.text)
            .where(EmbeddingsBase.profile_id == profile_id)
            .where(EmbeddingsBase.category.in_(categories))
            .order_by(EmbeddingsBase.embeddings.cosine_distance(query_embedding))
            .limit(limit)
        )
        
        similar_items = session.exec(stmt).all()
        
        for item in similar_items:
            results.append({
                "category": item.category,
                "text": item.text,
                # "distance": item.distance # Opcional: puedes devolver la distancia para debugging
            })
            
    return results