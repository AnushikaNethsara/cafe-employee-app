import React, { useState, useEffect } from 'react';
import TopBar from './Components/TopBar';
import { Grid, Typography, Button, Box, FormControl, TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE_BY_ID, GET_CAFES } from '../redux/types';
import {  toast } from 'react-toastify';

const AddEmployee = ({ cafes }) => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { state } = useLocation();
    const cafeList = useSelector(state => state.cafe);

    const [id, setId] = useState(state?.employeeData?.id ?? '');
    const [name, setName] = useState(state?.employeeData?.name ?? '');
    const [email, setEmail] = useState(state?.employeeData?.email_address ?? '');
    const [phone, setPhone] = useState(state?.employeeData?.phone_number ?? '');
    const [gender, setGender] = useState(state?.employeeData?.gender ?? 'Male');
    const [cafe, setCafe] = useState(state?.employeeData?.cafe ?? '');

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const handleIdChange = (event) => {
        setId(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleCafeChange = (event) => {
        setCafe(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleCancel = () => {
        if (hasUnsavedChanges && !window.confirm('Are you sure you want to discard your changes?')) {
            return;
        }
        //onCancel();
    };

    const onCancel = () => {
        history(-1);
    }

    const handleSave = (e) => {
        e.preventDefault();
        const newEmployee = {
            id,
            name,
            email_address: email,
            phone_number: phone,
            gender,
            cafe: cafe,
            start_date: " 12-02-2023"
        };
        if (state)
            handleEdit();
        else {
            dispatch({ type: CREATE_EMPLOYEE, employee: newEmployee });
            onCancel();
        }
    }

    const handleEdit = () => {
        const newEmployee = {
            id: state.employeeData.id,
            name,
            email_address: email,
            phone_number: phone,
            gender,
            cafe: cafe,
            start_date: " 12-02-2023"
        };
        dispatch({ type: UPDATE_EMPLOYEE_BY_ID, employee: newEmployee })
        onCancel();
    }

    useEffect(() => {
        dispatch({ type: GET_CAFES })
    }, []);

    // useEffect(() => {
    //     dispatch({ type: GET_CAFES })
    //     const handleBeforeUnload = (event) => {
    //         if (hasUnsavedChanges) {
    //             event.preventDefault();
    //             event.returnValue = '';
    //         }
    //     };
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [hasUnsavedChanges]);

    return (
        <Box>
            <Grid container alignItems="center" sx={{ mt: '5rem', mb: '2rem' }}>
                <Grid item xs={6}>
                    <Typography variant="h4" >ADD EMPLOYEE</Typography>
                </Grid>
            </Grid>
            <Box>
                <form onSubmit={handleSave}>
                    <FormControl fullWidth margin="normal">
                        <TextField label="ID" value={id} onChange={handleIdChange} required inputProps={{ maxLength: 50 }} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Name" value={name} onChange={handleNameChange} required inputProps={{ maxLength: 50 }} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Email" type="email" value={email} onChange={handleEmailChange} required />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Phone number" value={phone} onChange={handlePhoneChange} required inputProps={{ type: 'tel' }} />
                    </FormControl>
                    <FormControl margin="normal">
                        <RadioGroup value={gender} onChange={handleGenderChange}>
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <p>{cafe}</p>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Assigned Café</InputLabel>
                        <Select value={cafe} onChange={handleCafeChange}>
                            <MenuItem value="">None</MenuItem>
                            {cafeList?.map(cafe => (
                                <MenuItem key={cafe.id} value={cafe.id}>{cafe.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', '& > :not(:first-of-type)': { ml: 1 } }}>
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                        <Button type="button" variant="contained" color="warning" onClick={onCancel}>Cancel</Button>
                    </Box>
                    {/* <Button type="submit" variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    <Button type="button" variant="contained" color="primary" onClick={handleSave}>Cancel</Button> */}
                </form>
            </Box>
        </Box>
    );
}

export default AddEmployee;