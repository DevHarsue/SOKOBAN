from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int 
    icon: str
    username: str
    email: str
    rol: str
    
