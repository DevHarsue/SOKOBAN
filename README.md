# SOKOBAN ONLINE

Este es un proyecto del tipico juego sokoban con la posibilidad de crear niveles online y compartirlos con tus amigos.

En este repositorio encontraras todo lo necesario para desplegar este juego.

## Instalacion 

1. Lo primero a desplegar es el backend, que esta realizado con FASTAPI y PostgreSQL, primero que todo crea una base de datos llamada "**sokoban**", o ejecuta el archivo "**Sokoban.sql**".
2. Crea un archivo llamado "**.env**" en la raiz del proyecto con la siguiente estructura:
**USER="YOURUSER"**
**PASSWORD = "YOURPASSWORD"**
**HOST = "localhost"**
**DATABASE = "sokoban"**

*Nota: Son los datos para conectar a postgresql*

3. Se recomienda crear un entorno virtual antes de este paso, ejecuta el comando *pip install -r API/requirements.txt*, para instalar las librerias correspondientes.

4. Ejecuta *uvicorn API.main:app --host 0.0.0.0 --port 5000* para desplegar el backend.

5. Ejecuta el index.html con algo como **liveserver**.

*Nota: estos pasos son para ejecutar de manera local sin embargo son muy parecidos para desplegarla en un host*