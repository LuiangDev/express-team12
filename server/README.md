# 🔧 Backend

Esta carpeta contendrá la lógica del servidor, las funcionalidades del sistema y las conexiones con bases de datos y servicios externos.

Corresponde al desarrollo del **Backend** del producto digital del Team 12 para **Proyectos Express** de **No Country**.

> Responsable principal: Equipo de Backend

Leavantar la aplicación en local:

```
sh ./scripts/run-dev.sh
```

Correr los tests:

```
sh ./scripts/pytest.py
```

Levantar Docker en local:

1. Contruir la imagen estando en la carpeta server:

```
docker build -t express-project-12 .
```

2. Correr la imagen dentro de una contenedor
```
docker run --name project-container -p 3000:3000 --env-file ./.env express-project-12
```

3. En caso de errores, mira los logs
```
docker logs project-container
```

## 🐳 Levantar PostgreSQL con pgvector vía Docker

Puedes iniciar una base de datos PostgreSQL lista para RAG (con la extensión pgvector) usando:

```bash
docker run --name pg-rag -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=ragdb -p 5432:5432 -d ankane/pgvector
```

- Usuario: `postgres`
- Contraseña: `postgres`
- Base de datos: `ragdb`
- Puerto local: `5432`

Esto crea una instancia lista para usar con la extensión vectorial para IA y RAG.

> Si necesitas conectarte desde la app, usa la cadena:
> 
> `postgresql://postgres:postgres@localhost:5432/ragdb`
