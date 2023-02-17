import React, { useState } from 'react';
import DataTable from './Components/DataTable';
import { Grid, Typography, Button, Box } from '@mui/material';
import TopBar from './Components/TopBar';

const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
];

const columnDefs = [
    { field: 'Employee ID' },
    { field: 'Name' },
    { field: 'Email' },
    { field: 'Employees' },
    { field: 'Phone' },
    { field: 'Days worked in the Café' },
    { field: 'Café Name' },
    { field: 'Edit/Delete' }
]

const Employee = () => {
   
    return (
        <Box>
            <TopBar title={"EMPLOYEE"} path={"/addemployee"} buttonName={"ADD EMPLOYEE"}/>
            <DataTable rowData={rowData} columnDefs={columnDefs}/>
        </Box>
    );
}

export default Employee;