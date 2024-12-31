from ..db.models import Level
from ..models.levels_models import LevelResponse,LevelDetailResponse,LevelRequest,LevelUpdate
from .decorator import decorator_session
from sqlalchemy import select

class LevelManager:
    def convert_levels(self,levels):
        levels_convert = [LevelResponse(
                            id=level[0],
                            user_id=level[1],
                            name=level[2]).model_dump()
                        for level in levels]
        return levels_convert
    
    def convert_level_detail(self,level: Level):
        level_convert = LevelDetailResponse(
                            id=level.id,
                            user_id=level.user_id,
                            name=level.name,
                            message=level.message,
                            structure=level.structure).model_dump()
        return level_convert
    
    @decorator_session
    def get_all_levels(self,session):
        query = select(Level.id,Level.user_id,Level.name)
        levels = session.execute(query).all()
        return self.convert_levels(levels)
    
    @decorator_session
    def get_level_by_id(self,session,id):
        data = session.query(Level).where(Level.id==id).first()
        return self.convert_level_detail(data) if data else None
    
    @decorator_session
    def create_level(self,session,level: LevelRequest):
        level_db = Level(
                            name=level.name,
                            message=level.message,
                            structure=[obj.model_dump() for obj in level.structure],
                            user_id=level.user_id)
        session.add(level_db)
        query = select(Level).order_by(Level.id.desc())
        level = session.execute(query).fetchone()
        return self.convert_level_detail(level_db)

    @decorator_session
    def update_level(self,session,id:int,level:LevelUpdate):
        data = session.query(Level).where(Level.id==id).first()
        if not data:
            return None
        
        
        data.name = level.name if level.name else data.name
        data.user_id = level.user_id if level.user_id else data.user_id
        data.message = level.message if level.message else data.message
        data.structure =  [obj.model_dump() for obj in level.structure] if level.structure else data.structure
        session.commit()
        return self.convert_level_detail(data)
        
    
    @decorator_session
    def delete_level(self,session,id:int):
        level = session.query(Level).where(Level.id==id).first()
        if not level:
            return None
        
        session.delete(level)
        
        return self.convert_level_detail(level)