import React from 'react';
import TaskItem from './TaskItem';
import { Card, Typography } from '@mui/material';
import '../styles/TaskList.css';

function ClosedTaskList({closedTasks}) {
    return (
        <div>
            <Typography variant='h4'>Completed Tasks</Typography>
            {closedTasks.length > 0 ? (
                <ul className="task-card-list">
                    {closedTasks.map((task, index) => (
                        <Card key={index} sx={{ mb: 2 }} className='bg-primary-light'>
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

export default ClosedTaskList;