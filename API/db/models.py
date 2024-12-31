from sqlalchemy import Column, Integer,ForeignKey,Text
from sqlalchemy.dialects.postgresql import BYTEA,JSONB
from .config import Base,engine

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True,autoincrement=True)
    icon = Column(BYTEA,nullable=False)
    email = Column(Text, nullable=False)
    username = Column(Text, nullable=False)
    password = Column(Text, nullable=False)
    rol = Column(Text, nullable=False)
    

class Level(Base):
    __tablename__ = 'levels'
    id = Column(Integer, primary_key=True,autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'),nullable=False)
    name = Column(Text, nullable=False)
    message = Column(Text, nullable=False)
    structure = Column(JSONB, nullable=False)
    


Base.metadata.create_all(bind=engine)
