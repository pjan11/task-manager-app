import React, { useState, useEffect } from 'react';
import NewListModal from './NewListModal';
import { Button, Typography } from '@mui/material';

function ListView({ onSelectList }) {
    const [lists, setLists] = useState([]);
    const [open, setOpen] = useState(false);
    const [newListName, setNewListName] = useState('');

    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
        setNewListName('');
    }

    async function handleNewListName() {
        // Post new list and return it's name and id
        // add the new list to the lists state
        // set the selectedlist from Home component to the newly created list
        // close the modal and reset newListName
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
            } else {
                throw new Error('Failed to create list');
            }
        })
    }

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

    useEffect(() => {
        const data = initializeLists();
        setLists(data);
    }, []);

    const handleListClick = (list) => {
        onSelectList(list);
    }

    return (
        <div>
            <ul className='card-list'>
                {lists.length > 0 ? (
                    lists.map((list) => (
                        <Button onClick={() => handleListClick(list)} key={list.id} className='bg-primary-light' sx={{ mb: 2, mr: 3 }}>
                            <Typography variant='h5' component='div'>
                                {list.name}
                            </Typography>
                        </Button>
                    ))
                ) : null}
                <Button onClick={handleOpenDialog} className='bg-primary-light' sx={{ mb: 2, mr: 3 }}>
                    <Typography variant='h5' component='div'>
                        <i className='fa fa-plus'></i>
                    </Typography>
                </Button>
            </ul>
            <NewListModal
                open={open}
                onClose={handleCloseDialog}
                newListName={newListName}
                setNewListName={setNewListName}
                handleNewListName={handleNewListName}
            />
        </div>
    )
}

export default ListView;