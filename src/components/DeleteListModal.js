import React from 'react';
import { Button, Dialog, DialogTitle, DialogActions, Typography } from '@mui/material';

function DeleteListModal({ open, onClose, handleDeleteList, listToDelete }) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >   
            <DialogTitle>Are you sure you want to delete this list?</DialogTitle>
            <DialogActions>
                <Button onClick={() => handleDeleteList(listToDelete)}><Typography>Yes</Typography></Button>
                <Button onClick={onClose}><Typography>No</Typography></Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteListModal;