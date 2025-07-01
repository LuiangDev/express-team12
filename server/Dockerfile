FROM python:3.13-alpine3.21 AS build

WORKDIR /source

# Paquetes para compilar paquetes scikit-learn o numpy
# RUN apk upgrade --no-cache && \
#    apk add --no-cache gcc g++ python3-dev musl-dev

COPY requirements.txt ./

RUN python3 -m venv ./venv

RUN ./venv/bin/python3 -m ensurepip --upgrade && \
    ./venv/bin/pip install --no-cache-dir -r ./requirements.txt

FROM python:3.13-alpine3.21 AS final

WORKDIR /source

# Paquetes para ejecutar paquetes scikit-learn o numpy
# RUN apk upgrade --no-cache && \
#    apk add --no-cache libgfortran openblas libgomp libstdc++

COPY --from=build /source ./

COPY api ./

RUN addgroup -g 1234 dataverity-group && \
  adduser -D -u 1234 -G dataverity-group dataverity-user

USER dataverity-user:dataverity-group

CMD ["./venv/bin/python", "main.py"]