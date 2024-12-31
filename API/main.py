from fastapi import FastAPI,status
from fastapi.responses import JSONResponse
from .routers.level_router import level_router

app = FastAPI(
    title="SOKOBAN API",
    description="API PARA SOKOBAN",
    version="1.0",
)

@app.get("/",status_code=status.HTTP_200_OK)
def home() -> JSONResponse:
    return JSONResponse(content={"message":"SOKOBAN API, RUNNING..."},status_code=status.HTTP_200_OK)

app.include_router(level_router,prefix="/levels",tags=["Levels"])