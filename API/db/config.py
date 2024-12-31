from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from dotenv import load_dotenv
import os

load_dotenv()
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
DATABASE = os.getenv("DATABASE")

engine = create_engine(f"postgresql+psycopg://{USER}:{PASSWORD}@{HOST}/{DATABASE}")
Session = sessionmaker(bind=engine)

Base = declarative_base()

