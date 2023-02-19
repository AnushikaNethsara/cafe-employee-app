import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CREATE_CAFE, UPDATE_CAFE_BY_ID } from '../redux/types';
import { Box, Button, FormControl, TextField, Typography, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const AddCafe = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { state } = useLocation();

    const [name, setName] = useState(state?.cafeData?.name ?? '');
    const [description, setDescription] = useState(state?.cafeData?.description ?? '');
    const [location, setLocation] = useState(state?.cafeData?.location ?? '');

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleCancel = () => {
        if (hasUnsavedChanges && !window.confirm('Are you sure you want to discard your changes?')) {
            return;
        }
        onCancel();
    };

    const onCancel = () => {
        history(-1);
    };

    const handleSave = (e) => {
        e.preventDefault()
        const newCafe = {
            name,
            description,
            location,
        };
        if (state)
            handleEdit();
        else {
            dispatch({ type: CREATE_CAFE, cafe: newCafe });
            onCancel();
        }
    };

    const handleEdit = () => {
        const newCafe = {
            id: state.cafeData.id,
            name,
            description,
            location,
        };
        dispatch({ type: UPDATE_CAFE_BY_ID, cafe: newCafe })
        onCancel();
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);


    return (
        <Box>
            <Grid container justifyContent="center" alignItems="center" sx={{ mt: '5rem', mb: '2rem' }}>
                <Typography variant="h4">ADD CAFE</Typography>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSave}>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Name" value={name} onChange={handleNameChange} required />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Description" value={description} onChange={handleDescriptionChange} required />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Location" value={location} onChange={handleLocationChange} required />
                    </FormControl>
                    <Box
                        sx={{
                            marginTop: '3rem',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            '& > :not(:first-of-type)': { ml: 1 },
                        }}
                    >
                        <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                            Save
                        </Button>
                        <Button type="button" variant="contained" color="warning" onClick={onCancel} endIcon={<CancelIcon />}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box >
    );
}

export default AddCafe;
