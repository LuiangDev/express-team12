# Servicio para generar embeddings de texto usando HuggingFace
import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key=os.environ["HF_TOKEN"],
)

def generate_embedding(text: str) -> list:
    """
    Genera un vector de embedding de 1024 dimensiones para el texto dado.
    Args:
        text (str): Texto de entrada.
    Returns:
        list: Vector de embedding (longitud 1024).
    """
    result = client.feature_extraction(
        text,
        model="intfloat/multilingual-e5-large",
    )
    #print(f"Tipo de resultado: {type(result)}")
    #print(f"Resultado: {result}")
    #print(f"Longitud: {len(result) if hasattr(result, '__len__') else 'N/A'}")
    # Convertimos a lista si es un array de numpy
    try:
        import numpy as np
        if isinstance(result, np.ndarray):
            result = result.tolist()
    except ImportError:
        pass
    if not isinstance(result, list) or len(result) != 1024:
        raise ValueError("El embedding generado no tiene 1024 dimensiones.")
    return result
