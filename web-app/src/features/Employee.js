import React, { useState, useEffect } from 'react';
import DataTable from './Components/DataTable';
import { Grid, Typography, Button, Box } from '@mui/material';
import TopBar from './Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { GET_EMPLOYEES } from '../redux/types';

const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
];

const columnDefs = [
    { headerName: "Employee ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email Address", field: "email" },
    { headerName: "Phone Number", field: "phone" },
    { headerName: "Days Worked", field: "daysWorked" },
    { headerName: "Café Name", field: "assignedCafe" },
    // { field: 'Edit/Delete' }
]

const Employee = () => {

    const dispatch = useDispatch();
    const rows = useSelector(state => state.employee);
    React.useEffect(() => {
        dispatch({ type: GET_EMPLOYEES })
    }, [])
   
    return (
        <Box>
            <TopBar title={"EMPLOYEE"} path={"/addemployee"} buttonName={"ADD EMPLOYEE"}/>
            <DataTable rowData={rows} columnDefs={columnDefs}/>
        </Box>
    );
}

export default Employee;