import React, { useState } from 'react';
import TotalTimeForm from './TotalTimeForm';
import { Button, Grid, Typography } from '@mui/material';
import '../styles/TotalTime.css';

function TotalTime({ endTime, setTime, openTaskTime, remainingTime }) {
    const [editFlag, setEditFlag] = useState(false);

    const updateFlag = () => {
        setEditFlag(!editFlag);
    }

    return (
        <div className='total-time-container'>
            <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                    <div style={{ display: 'flex', alignItems: 'center', whiteSpace:'nowrap' }}>
                        <Typography variant='h6'>Time Remaining</Typography>
                        {!editFlag && (
                            <Button onClick={updateFlag} style={{ marginLeft: '10px' }}>
                                <i className='fa fa-pencil quarternary'></i>
                            </Button>
                        )}
                    </div>
                    <Typography variant='h4'>{remainingTime} hours</Typography>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Typography variant='h6'>Open Task Time</Typography>
                    <Typography variant='h4'>{openTaskTime} hours</Typography>
                </Grid>
                {editFlag ? (
                    <Grid item>
                        <TotalTimeForm editFlag={editFlag} endTime={endTime} setTime={setTime} updateFlag={updateFlag} />
                    </Grid>
                ) : null}
            </Grid>
        </div>
    )
}

export default TotalTime;