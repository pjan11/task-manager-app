import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '../styles/TaskForm.css';

function TaskForm({ addTask }) {
    const [task, setTask] = useState({title:'', status: 'Open', duration: '', list_id: 0});

    async function postTask(task) {
        return fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Failed to create task');
            }
        });
    }

    /*
        Trim the task name,
        Post the task to the DB,
        Add the task to state,
        Reset the form
        *** Need to add an error catch if the post fails -> Don't need 
        to add to state if an error on post occurs
    */
    async function handleFormOnSubmit(e) {
        e.preventDefault();
        if (task.title.trim === '') return;
        try{
            await postTask(task);
            addTask(task);
            setTask({ title: '', status: 'Open', duration: '', list_id: 0 });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid className='task-form-container'>
            <Typography variant='h4'>Add New Task</Typography>
            <Box
                component='form'
                onSubmit={handleFormOnSubmit}>
                <TextField
                    type="text"
                    label='Task'
                    variant='standard'
                    value={task.title}
                    sx={{mr: 2}}
                    onChange={(e) => setTask({...task, title: e.target.value})}
                ></TextField>
                <TextField
                    type="text"
                    label='Duration'
                    variant='standard'
                    value={task.duration}
                    onChange={(e) => setTask({...task, duration: e.target.value})}
                ></TextField>
                <Button type='submit'><i className="fa fa-plus quarternary"></i></Button>
            </Box>
        </Grid>
    );
}

export default TaskForm;