from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class List(db.Model):
    __tablename__ = 'list'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    tasks = relationship('Task', backref='list')

    def __init__(self, name):
        self.name = name

class Task(db.Model):
    __tablename__ = 'task'
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    status = Column(String(50))
    duration = Column(String(10))
    list_id = Column(Integer, ForeignKey('list.id'))

    def __init__(self, title, status, duration, list_id):
        self.title = title
        self.status = status
        self.duration = duration
        self.list_id = list_id