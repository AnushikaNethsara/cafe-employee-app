import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CREATE_CAFE,UPDATE_CAFE_BY_ID } from '../redux/types';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';

const AddCafe = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { state } = useLocation();

    const [name, setName] = useState(state?.cafeData?.name ?? '');
    const [description, setDescription] = useState(state?.cafeData?.description ?? '');
    const [employees, setEmployees] = useState([]);
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

    const handleEmployeesChange = (event) => {
        setEmployees(event.target.value);
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

    const handleSave = () => {
        const newCafe = {
            name,
            description,
            employees,
            location,
        };
        //dispatch({ type: CREATE_CAFE, cafe: newCafe });
        if (state)
            handleEdit();
        else
            console.log("save");
    };

    const handleEdit = () => {
        console.log("edit");
        dispatch({ type: UPDATE_CAFE_BY_ID, cafe: state.cafeData })
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // onSave();
        let obj = {
            name,
            description,
            employees,
            location,
        };
        setHasUnsavedChanges(false);
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mt: '5rem', mb: '2rem' }}>
                ADD CAFÉ
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <TextField label="Name" value={name} onChange={handleNameChange} required />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField label="Description" value={description} onChange={handleDescriptionChange} required />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField label="Employees" value={employees} onChange={handleEmployeesChange} />
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
                    <Button type="submit" variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button type="button" variant="contained" color="warning" onClick={onCancel}>Cancel</Button>
                </Box>
            </form>
        </Box >
    );
}

export default AddCafe;
