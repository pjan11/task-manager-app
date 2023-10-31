import React, { useState, useEffect } from 'react';
import { ButtonBase, Card, CardActions, CardContent, Typography } from '@mui/material';

function ListView() {
    const [lists, setLists] = useState([]);

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

    return (
        <div>
            {lists.length > 0 ? (
                <ul className='card-list'>
                    {lists.map((list) => (
                        <Card key={list.id} className='bg-primary-light' sx={{ mb: 2, mr: 3 }}>
                            <CardActions disableSpacing sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                padding: 0
                            }}>
                            </CardActions>
                            <CardContent>
                                <Typography variant='h5' component='div'>
                                    {list.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </ul>
            ) : (
                <Typography variant='body1'>No Lists</Typography>
            )}
        </div>
    )
}

export default ListView;