import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

function NewListModal({ open, onClose, handleNewListName, newListName, setNewListName }) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >   
            <DialogTitle>Create a New List</DialogTitle>
            <DialogContent>
                <TextField
                    label='List Name'
                    variant='outlined'
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleNewListName}><i className="fa fa-plus quarternary"></i></Button>
                <Button onClick={onClose}><i className="fa fa-ban danger"></i></Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewListModal;