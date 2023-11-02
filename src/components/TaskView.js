import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TotalTime from './TotalTime';
import { Grid } from '@mui/material';

function TaskView({ selectedListId }) {
    const [closedTasks, setClosedTasks] = useState([]);
    const [endTime, setEndTime] = useState('24:00');
    const [openTaskTime, setOpenTaskTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [tasks, setTasks] = useState([]);

    const currDate = new Date();

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const closeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        let closedTask = tasks[index];
        closedTask.status = 'Closed';
        setTasks([...updatedTasks]);
        setClosedTasks([...closedTasks, closedTask]);
        updateRemainingTime();
    };

    const updateOpenTime = (newOpenTaskTime) => {
        setOpenTaskTime(newOpenTaskTime);
    }

    const setTime = (newTime) => {
        setEndTime(newTime);
        updateRemainingTime();
    }

    const updateRemainingTime = () => {
        const splitTime = endTime.split(':');

        let hours = splitTime[0] - currDate.getHours();
        let minutes = splitTime[1] - currDate.getMinutes();

        setRemainingTime((hours + (minutes / 60)).toFixed(2));
    }

    const tasksByList = async (listId) => {
        try {
            const response = await fetch(`api/tasks/by-list/${listId}`);
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedListId !== null || selectedListId !== undefined) tasksByList(selectedListId);
    }, [selectedListId])

    return (
        <Grid container>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TotalTime 
                        endTime={endTime} 
                        setTime={setTime} 
                        openTaskTime={openTaskTime} 
                        remainingTime={remainingTime} 
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TaskForm addTask={addTask} tasks={tasks} />
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <TaskList 
                    tasks={tasks} 
                    closedTasks={closedTasks} 
                    closeTask={closeTask} 
                    updateOpenTime={updateOpenTime} 
                />
            </Grid>
        </Grid>
    );
};

export default TaskView;