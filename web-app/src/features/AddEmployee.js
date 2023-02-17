import React, { useState, useEffect } from 'react';
import TopBar from './Components/TopBar';
import { Grid, Typography, Button, Box, FormControl, TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_EMPLOYEE_BY_ID } from '../redux/types';

const AddEmployee = ({ cafes }) => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { state } = useLocation();

    const [name, setName] = useState(state?.employeeData?.name ?? '');
    const [email, setEmail] = useState(state?.employeeData?.email ?? '');
    const [phone, setPhone] = useState(state?.employeeData?.phone ?? '');
    const [gender, setGender] = useState(state?.employeeData?.gender ?? 'male');
    const [cafe, setCafe] = useState(state?.employeeData?.assignedCafe ?? '');

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

    const onCancel =()=>{
        history(-1);
    }

    const handleSave = () => {
        if (state)
            handleEdit();
        else
            console.log("save");
    }

    const handleEdit = (data) => {
        console.log("edit");
        dispatch({ type: UPDATE_EMPLOYEE_BY_ID, employee: state.employeeData })
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
        //onSave();
        let obj = {
            name,
            email,
            phone,
            gender,
            cafe
        };
        console.log(obj);
        setHasUnsavedChanges(false);
    };

    return (
        <Box>
            <Grid container alignItems="center" sx={{ mt: '5rem', mb: '2rem' }}>
                <Grid item xs={6}>
                    <Typography variant="h4" >ADD EMPLOYEE</Typography>
                </Grid>
            </Grid>
            <Box>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Name" value={name} onChange={handleNameChange} required inputProps={{ minLength: 6, maxLength: 10 }} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Email" type="email" value={email} onChange={handleEmailChange} required />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Phone number" value={phone} onChange={handlePhoneChange} required inputProps={{ type: 'tel' }} />
                    </FormControl>
                    <FormControl margin="normal">
                        <RadioGroup value={gender} onChange={handleGenderChange}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Assigned Café</InputLabel>
                        <Select value={cafe} onChange={handleCafeChange}>
                            <MenuItem value="">None</MenuItem>
                            {/* {cafes.map(cafe => (
                                <MenuItem key={cafe.id} value={cafe.id}>{cafe.name}</MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', '& > :not(:first-of-type)': { ml: 1 } }}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleSave}>Save</Button>
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