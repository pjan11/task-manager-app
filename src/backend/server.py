from flask import Flask
from app.models import db
from app.routes.task import tasks_bp
from app.routes.list import lists_bp
from config import SQLALCHEMY_DATABASE_URI
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db.init_app(app)

app.register_blueprint(tasks_bp)
app.register_blueprint(lists_bp)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Create database tables
with app.app_context():
    try:
        db.create_all()
    except Exception as e:
        print(f"Error creating database tables: {e}")

if __name__ == '__main__':
    app.run(debug=True)