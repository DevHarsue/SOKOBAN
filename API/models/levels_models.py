from pydantic import BaseModel,validator,Field
from typing import List

class LevelResponse(BaseModel):
    id: int 
    user_id: int
    name: str

class Object(BaseModel):
    x: int = Field(gt=0)
    y: int = Field(gt=0)
    type: str
    
    @validator("type")
    def validate_type(cls,value):
        if value not in ["Jugador","Hueco","Caja","Muro"]:
            raise ValueError("Invalid type")
        return value

class LevelDetailResponse(BaseModel):
    id: int
    user_id: int
    name: str
    message: str
    structure: List[Object]

class LevelRequest(BaseModel):
    name: str
    user_id: int = Field(gt=0)
    message: str
    structure: List[Object]
    
    @validator("name")
    def validate_name(cls,value):
        if len(value) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return value.upper()

    @validator("message")
    def validate_message(cls,value):
        if len(value) < 10:
            raise ValueError("Message must be at least 10 characters long")
        return value.upper()

class LevelUpdate(LevelRequest):
    name: str | None=None
    user_id: int | None=None
    message: str | None=None
    structure: List[Object] | None=None