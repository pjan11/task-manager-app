import React, { useState, useEffect } from 'react';
import DeleteListModal from './DeleteListModal';
import NewListModal from './NewListModal';
import { Button, Typography } from '@mui/material';
import '../styles/ListView.css';

function ListView({ onSelectList }) {
    const [lists, setLists] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);
    const [newListName, setNewListName] = useState('');

    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
        setNewListName('');
    }

    const handleOpenDeleteModal = (listId) => {
        setListToDelete(listId);
        setDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
        setListToDelete(null);
    }

    /*
        Post a new list and return it's name and id,
        Add the new list to the lists state,
        Set the selectedlist from Home component to the newly created list,
        Close the modal and reset newListName
    */
    async function handleNewListName() {
        try {
            const response = await postList(newListName);
            setLists([...lists, response.list]);
            onSelectList(response.list);
            handleCloseDialog();
        } catch (error) {
            console.log(error);
        }
    }

    async function postList(listName) {
        return fetch('http://localhost:5000/api/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: listName}),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }else {
                throw new Error('Failed to create list');
            }
        })
    }

    async function deleteList(list_id) {
        try {
            const response = await fetch(`http://localhost:5000/api/lists/${list_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message };
            } else {
                const data = await response.json();
                throw new Error('Failed to delete list: ${data.error');
            }
        } catch(error) {
            console.error('An error has occurred trying to delete the list', error);
            return { success: false, message: 'An error has occurred trying to delete the list'};
        }
    }

    async function handleDeleteList(list_id) {
        let res = await deleteList(list_id);
        if (res.success) {
            let listUpdate = lists.filter(x => x.id !== list_id);
            setLists(listUpdate);
        } else {
            console.log(res.message);
        }
        handleCloseDeleteModal();
    }

    /*
        Get all of the lists,
        Set the lists state to the lists from the db
    */
    function initializeLists() {
        return fetch('http://localhost:5000/api/lists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => setLists(data))
        .catch((error) => console.error('Error fetching lists', error));
    }

    // initialize the lists on load
    useEffect(() => {
        const data = initializeLists();
        setLists(data);
    }, []);

    const handleListClick = (list) => {
        onSelectList(list);
    }

    return (
        <div className='card-list'>
            <ul className='card-item'>
                <Button onClick={handleOpenDialog} sx={{ mb: 2, mr: 3 }}>
                    <Typography variant='h5' component='div'>
                        <i className='fa fa-plus quarternary'></i>
                    </Typography>
                </Button>
            </ul>
                {lists.length > 0 ? (
                    lists.map((list) => (
                        <ul className='card-item'>
                            <div key={list.id} >
                                <Button onClick={() => handleListClick(list)}  className='primary-light-bg' sx={{ mb: 2, mr: 3 }}>
                                    <Typography variant='h5' component='div' className='quarternary'>
                                        {list.name}
                                    </Typography>
                                </Button>
                                <Button onClick={() => handleOpenDeleteModal(list.id)}>
                                    <Typography variant='h5' component='div'>
                                        <i className='fa fa-trash danger'></i>
                                    </Typography>
                                </Button>
                            </div>
                        </ul>
                    ))
                ) : null}
            <NewListModal
                open={open}
                onClose={handleCloseDialog}
                newListName={newListName}
                setNewListName={setNewListName}
                handleNewListName={handleNewListName}
            />
            <DeleteListModal
                open={deleteModal}
                onClose={handleCloseDeleteModal}
                handleDeleteList={handleDeleteList}
                listToDelete={listToDelete}
            />
        </div>
    )
}

export default ListView;