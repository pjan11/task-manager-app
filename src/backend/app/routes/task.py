from flask import Blueprint, jsonify, request
from ..models import Task, db

tasks_bp = Blueprint('tasks', __name__)

# Queries
@tasks_bp.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    try:
        tasks = Task.query.all()
        task_list = [{'title': task.title, 'status': task.status, 'duration': task.duration} for task in tasks]
        return jsonify(task_list), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching tasks.'})
    
@tasks_bp.route('/api/tasks/by-list/<int:list_id>', methods=['GET'])
def get_all_tasks_by_list_id(list_id):
    tasks = Task.query.filter_by(list_id=list_id).all()

    task_list = [{'id': task.id, 'title': task.title, 'status': task.status, 'list_id': task.list_id} for task in tasks]

    return jsonify(task_list)

#  Create
@tasks_bp.route('/api/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        new_task = Task(title=data['title'], status=data['status'], duration=data['duration'], list_id=data['list_id'])
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'Task created'}), 201
    except Exception as e:
        return jsonify({'error': 'An error occurred while creating the task.' + str(e)}), 409

# Update
@tasks_bp.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    task = Task.query.get(task_id)

    if task:
        task.title = data.get('title', task.title)
        task.duration = data.get('duration', task.duration)
        task.status = data.get('status', task.status)
    
        db.session.commit()

        return jsonify({'message': 'Task updated successfully'}), 200
    else:
        return jsonify({'error': 'Task nbt found'}), 404


# Delete
@tasks_bp.route('/api/tasks', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)

    if task is not None:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task successfully deleted'}), 200
    else:
        return jsonify({'error': 'Task not found'}), 404