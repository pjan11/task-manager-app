import React from 'react';
import { CardContent, Typography } from '@mui/material';

function TaskItem({title, status, duration}) {
    return (
        <CardContent>
            <Typography variant='h5' component='div'>
                {title}
            </Typography>
            <Typography color="text.secondary">
                Duration: {duration}
            </Typography>
            <Typography color="text.secondary">
                Status: {status}
            </Typography>
        </CardContent>
    )
}

export default TaskItem;