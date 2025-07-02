from dotenv import load_dotenv
import os
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain

load_dotenv()

class WelcomeEmailService:
    def __init__(self):
        self.prompt = PromptTemplate(
            input_variables=["nombre", "pais", "intereses"],
            template=(
                "Redacta un email corto y cálido de bienvenida para un nuevo usuario llamado {nombre} que es de {pais} y tiene estos intereses: {intereses}. "
                "El email debe terminar invitando al usuario a explorar la plataforma."
            )
        )
        self.llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, api_key=os.getenv("OPENAI_API_KEY"))
        self.llm_chain = LLMChain(llm=self.llm, prompt=self.prompt)

    def generar_email(self, nombre: str, pais: str, intereses: str) -> str:
        response = self.llm_chain.invoke({
            "nombre": nombre,
            "pais": pais,
            "intereses": intereses
        })
        if isinstance(response, dict) and "text" in response:
            return response["text"]
        return str(response)
