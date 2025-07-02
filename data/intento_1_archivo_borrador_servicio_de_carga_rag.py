import json
from pathlib import Path

class RAGService:
    _data = None  # Variable en cache: Datos cargados una sola vez y reutilizados para mejorar el rendimiento

    @classmethod
    def load_data(cls):
        if cls._data is None:
            file_path = Path("data/intento_1_archivo_datos_dummy.json")
            with open(file_path, "r", encoding="utf-8") as file:
                cls._data = json.load(file)
        return cls._data
