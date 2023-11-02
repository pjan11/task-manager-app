from flask import Blueprint, jsonify, request
from sqlalchemy import desc
from ..models import List, db

lists_bp = Blueprint('lists', __name__)

# Queries
@lists_bp.route('/api/lists', methods=['GET'])
def get_all_lists():
    try:
        lists = List.query.order_by(desc(List.id)).all()
        list_list = [{'name': list.name, 'id': list.id} for list in lists]
        return jsonify(list_list), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching lists.'})

#  Create
@lists_bp.route('/api/lists', methods=['POST'])
def create_list():
    try:
        data = request.get_json()
        new_list = List(name=data['name'])
        db.session.add(new_list)
        db.session.commit()
        new_list_dict = {
            'id': new_list.id,
            'name': new_list.name,
            # Add any other attributes you want to include
        }
        return jsonify({'message': 'List created', 'list': new_list_dict}), 201
    except Exception as e:
        return jsonify({'error': 'An error occurred while creating the list.' + str(e)}), 409

# Update
@lists_bp.route('/api/lists/<int:list_id>', methods=['PUT'])
def update_list(list_id):
    data = request.get_json()
    list = List.query.get(list_id)

    if list:
        list.name = data.get('name', list.name)
    
        db.session.commit()

        return jsonify({'message': 'List updated successfully'}), 200
    else:
        return jsonify({'error': 'List nbt found'}), 404


# Delete
@lists_bp.route('/api/lists', methods=['DELETE'])
def delete_list(list_id):
    list = List.query.get(list_id)

    if list is not None:
        db.session.delete(list)
        db.session.commit()
        return jsonify({'message': 'List successfully deleted'}), 200
    else:
        return jsonify({'error': 'List not found'}), 404