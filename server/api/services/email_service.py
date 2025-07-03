from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain.chains.llm import LLMChain
import os

from models.email_models import CreateEmail, ReceiverBase

load_dotenv()

GROQ_API_KEY=os.getenv("GROQ_API_KEY")

class EmailService:
  def __init__(self):
    self.llm = ChatGroq(
      api_key=GROQ_API_KEY,
      model="deepseek-r1-distill-llama-70b",
      temperature=0,
      max_tokens=None,
      reasoning_format="parsed",
      timeout=None,
      max_retries=2,
      streaming=True
    )
    
    self.llm_prompt = PromptTemplate(
      input_variables=["length", "tone", "type", "occupation", "name", "country", "interests", "message"],
      template=(
        "Redacta un email {length} y {tone} de {type} para un nuevo usuario llamado {name} que es de {country} con la ocuapción {occupation} y tiene estos intereses: {interests}."
        "También contener el siguiente mensaje: {message}. Si no hay mensaje, pásalo por alto este item"
        "El email debe terminar invitando al usuario a explorar la plataforma."
      )
    )

    self.llm_chain = self.llm_prompt | self.llm

  def generate_email(self, body: CreateEmail) -> str:
    keys = [k for k in body.model_dump().keys()]
    values = [v for v in body.model_dump().values()]
    
    response = self.llm_chain.invoke(dict(zip(keys, values)))

    if isinstance(response, dict) and "text" in response:
      return response["text"]
    return str(response.content)