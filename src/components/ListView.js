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
            } else {
                throw new Error('Failed to create list');
            }
        })
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
        <div>
            <ul className='card-list'>
                {lists.length > 0 ? (
                    lists.map((list) => (
                        <Button onClick={() => handleListClick(list)} key={list.id} className='primary-bg-light' sx={{ mb: 2, mr: 3 }}>
                            <Typography variant='h5' component='div' className='quarternary'>
                                {list.name}
                            </Typography>
                        </Button>
                    ))
                ) : null}
                <Button onClick={handleOpenDialog} className='primary-bg-light' sx={{ mb: 2, mr: 3 }}>
                    <Typography variant='h5' component='div'>
                        <i className='fa fa-plus quarternary'></i>
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