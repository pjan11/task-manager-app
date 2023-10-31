import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import '../styles/TotalTimeForm.css';

function TotalTimeForm({ endTime, setTime, updateFlag }) {
    const [newTime, setNewTime] = useState(endTime);

    const handleOnChange = (e) => {
        setNewTime(e.target.value);
    }

    const handleFormOnSubmit = (e) => {
        e.preventDefault();
        setTime(newTime);
        updateFlag();
    };

    const onCancel = () => {
        updateFlag();
    }

    return (
        <Box component='form' onSubmit={handleFormOnSubmit} sx={{ mt: 2 }}>
            <TextField
                type="text"
                placeholder='Enter a time HH:mm'
                value={newTime}
                variant='standard'
                onChange={handleOnChange}
            ></TextField>
            <Button type='submit'><i className="fa fa-check success"></i></Button>
            <Button onClick={onCancel}><i className="fa fa-ban danger"></i></Button>
        </Box>
    );
}

export default TotalTimeForm;