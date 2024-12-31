from fastapi import APIRouter,status,Path,Query
from fastapi.responses import JSONResponse
from typing import List
from ..models.levels_models import LevelResponse,LevelDetailResponse,LevelRequest,LevelUpdate
from ..actions.level_action import LevelManager

level_router = APIRouter()

@level_router.get("/",status_code=status.HTTP_200_OK)
def get_all_levels() -> List[LevelResponse]:
    manager = LevelManager()
    return JSONResponse(content=manager.get_all_levels(),status_code=status.HTTP_200_OK)

@level_router.get("/{id}",status_code=status.HTTP_200_OK)
def get_level_by_id(id: int = Path(gt=0)) -> LevelDetailResponse:
    manager = LevelManager()
    data = manager.get_level_by_id(id=id)
    if not data:
        return JSONResponse(content={"message": "Level not found"},status_code=status.HTTP_404_NOT_FOUND)
    return JSONResponse(content=data,status_code=status.HTTP_200_OK)

@level_router.post("/",status_code=status.HTTP_201_CREATED)
def create_level(level: LevelRequest) -> LevelDetailResponse:
    manager = LevelManager()
    data = manager.create_level(level=level)
    return JSONResponse(content=data,status_code=status.HTTP_201_CREATED)

@level_router.put("/",status_code=status.HTTP_200_OK)
def update_level(level: LevelUpdate,id: int = Query(gt=0)) -> LevelDetailResponse:
    manager = LevelManager()
    data = manager.update_level(id=id,level=level)
    if not data:
        return JSONResponse(content={"message": "Level not found"},status_code=status.HTTP_404_NOT)
    return JSONResponse(content=data,status_code=status.HTTP_200_OK)
    

@level_router.delete("/",status_code=status.HTTP_200_OK)
def delete_level(id: int =Query(gt=0)) -> LevelDetailResponse:
    manager = LevelManager()
    data = manager.delete_level(id=id)
    if not data:
        return JSONResponse(content={"message":"Level not found"},status_code=status.HTTP_200_OK)
    
    return JSONResponse(content=data,status_code=status.HTTP_200_OK)