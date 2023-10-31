import React from 'react';
import OpenTaskList from './OpenTaskList';
import ClosedTaskList from './ClosedTaskList';
import { Grid } from '@mui/material';
import '../styles/TaskList.css';

function TaskList({ tasks, closedTasks, closeTask, updateOpenTime }) {
    return (
        <Grid container className='task-list-container'>
            <Grid item xs={6}>
                <OpenTaskList tasks={tasks} closeTask={closeTask} updateOpenTime={updateOpenTime} />
            </Grid>
            <Grid item xs={6}>
                <ClosedTaskList closedTasks={closedTasks} />
            </Grid>
        </Grid>
    )
}

export default TaskList;