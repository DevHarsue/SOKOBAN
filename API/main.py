from fastapi import FastAPI,status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .routers.level_router import level_router

app = FastAPI(
    title="SOKOBAN API",
    description="API PARA SOKOBAN",
    version="1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials = True,
    allow_origins = ['*'],
    allow_methods = ['*'],
    allow_headers = ['*']
)


@app.get("/",status_code=status.HTTP_200_OK)
def home() -> JSONResponse:
    return JSONResponse(content={"message":"SOKOBAN API, RUNNING..."},status_code=status.HTTP_200_OK)

app.include_router(level_router,prefix="/levels",tags=["Levels"])