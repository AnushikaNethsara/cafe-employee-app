import React, { useState, useEffect } from 'react';
import DataTable from './Components/DataTable';
import { Grid, Typography, Button, Box } from '@mui/material';
import TopBar from './Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { GET_EMPLOYEES, DELETE_EMPLOYEE_BY_ID } from '../redux/types';
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewEmployeeCafe = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rows = useSelector(state => state.employee);
    React.useEffect(() => {
        dispatch({ type: GET_EMPLOYEES })
    }, []);

    const handleEdit = (data) => {
        //navigate(`/addemployee/${data.id}`);
        navigate('/addemployee', { state: { employeeData: data } });
    }

    const handleDelete = (data) => {
        dispatch({ type: DELETE_EMPLOYEE_BY_ID, id: data.id });
    }

    const columnDefs = [
        { headerName: "Employee ID", field: "id" },
        { headerName: "Name", field: "name" },
        { headerName: "Email Address", field: "email_address" },
        { headerName: "Phone Number", field: "phone_number" },
        // { headerName: "Days Worked", field: "daysWorked" },
        // { headerName: "Café Name", field: "assignedCafe" },
        {
            headerName: "Actions",
            field: "edit",
            cellRendererFramework: (params) => (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        onClick={() => handleEdit(params.data)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(params.data)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '2rem', mt: '2rem' }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>View Employee Cafe</Typography>
                <Link to="/cafe" className="link-tag" style={{ display: 'inline-block' }}>
                    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>BACK</Button>
                </Link>
            </Box>
            <Divider />
            {/* <Box sx={{ mb: '2rem', mt: "2rem" }}>
                <DataTable rowData={rows ? rows : []} columnDefs={columnDefs} />
            </Box> */}
        </Box>
    );
}

export default ViewEmployeeCafe;