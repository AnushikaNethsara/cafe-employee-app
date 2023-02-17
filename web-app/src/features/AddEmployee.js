import React, { useState, useEffect } from 'react';
import TopBar from './Components/TopBar';
import { Grid, Typography, Button, Box, FormControl, TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ employee, cafes, onSave, onCancel }) => {
    const [name, setName] = useState(employee ? employee.name : '');
    const [email, setEmail] = useState(employee ? employee.email : '');
    const [phone, setPhone] = useState(employee ? employee.phone : '');
    const [gender, setGender] = useState(employee ? employee.gender : 'male');
    const [cafe, setCafe] = useState(employee && employee.cafe ? employee.cafe : '');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const history = useNavigate();

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
        onCancel();
    };

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
            <TopBar title={"ADD EMPLOYEE"} path={"/employee"} buttonName={"BACK"} />
            <Box>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Name" value={name} onChange={handleNameChange} required inputProps={{ minLength: 6, maxLength: 10 }} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Email" type="email" value={email} onChange={handleEmailChange} required />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label="Phone number" value={phone} onChange={handlePhoneChange} required inputProps={{ pattern: '[89]\\d{7}' }} />
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
                    {/* <Button type="submit" variant="contained" color="primary">Save</Button>
                    <Button type="button" variant="contained" color="default" onClick={onCancel}>Cancel</Button> */}
                </form>
            </Box>
        </Box>
    );
}

export default AddEmployee;