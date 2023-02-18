import React, { useState, useEffect } from 'react';
import DataTable from './Components/DataTable';
import { Grid, Typography, Button, Box } from '@mui/material';
import TopBar from './Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { GET_EMPLOYEES_BY_CAFE, DELETE_EMPLOYEE_BY_ID } from '../redux/types';
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewEmployeeCafe = () => {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rows = useSelector(state => state.employee.employees);
    React.useEffect(() => {
        dispatch({ type: GET_EMPLOYEES_BY_CAFE, id: state.cafeData.id })
    }, []);

    const handleEdit = (data) => {
        navigate('/addemployee', { state: { employeeData: data } });
    }

    const handleDelete = (data) => {
        dispatch({ type: DELETE_EMPLOYEE_BY_ID, id: data.id });
    }

    const handleBack=()=>{
        navigate(-1);
    }

    const columnDefs = [
        { headerName: "Employee ID", field: "id" },
        { headerName: "Name", field: "name" },
        { headerName: "Email Address", field: "email_address" },
        { headerName: "Phone Number", field: "phone_number" },
        { headerName: "Days Worked", field: "days_worked" },
    ];
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '2rem', mt: '2rem' }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>{state.cafeData.name} Employees</Typography>
                <Button onClick={handleBack} variant="contained" color="primary" startIcon={<ArrowBackIcon />}>BACK</Button>
            </Box>
            <Divider />
            <Box sx={{ mb: '2rem', mt: "2rem" }}>
                <DataTable rowData={rows ? rows : []} columnDefs={columnDefs} />
            </Box>
        </Box>
    );
}

export default ViewEmployeeCafe;