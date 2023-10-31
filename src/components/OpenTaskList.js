import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { Button, Card, CardActions, Typography } from '@mui/material';
import '../styles/TaskList.css';

function OpenTaskList({ tasks, closeTask, updateOpenTime }) {
    useEffect(() => {
        updateOpenTotalTime();
    }, [tasks, updateOpenTotalTime]);

    const updateOpenTotalTime = () => {
        const newtotalTime = tasks.reduce((acc, curr) => acc + parseFloat(curr.duration), 0);
        updateOpenTime(newtotalTime);
    }

    const handleClose = (index) => {
        closeTask(index);
        updateOpenTotalTime();
    }

    return (
        <div>
            <Typography variant='h4'>Open Tasks</Typography>
            {tasks.length > 0 ? (
                <ul className='task-card-list'>
                    {tasks.map((task, index) => (
                        <Card key={index} className='bg-primary-light' sx={{ mb: 2, mr: 3 }}>
                            <CardActions disableSpacing sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                padding: 0
                            }}>
                                <Button size='small' onClick={() => handleClose(index)} className='card-button'><i className="fa fa-times danger"></i></Button>
                            </CardActions>
                            <TaskItem title={task.title} status={task.status} duration={task.duration} />
                        </Card>
                    ))}
                </ul>
            ) : (
                <Typography variant='body1'>No Tasks</Typography>
            )}

        </div>
    )
}

export default OpenTaskList;