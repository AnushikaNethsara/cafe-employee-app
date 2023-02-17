import React, { useState, useEffect } from 'react';
import DataTable from './Components/DataTable';
import { Grid, Typography, Button, Box } from '@mui/material';
import TopBar from './Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CAFES, DELETE_CAFE_BY_ID } from '../redux/types';
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";


const Cafe = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rows = useSelector(state => state.cafe);
    React.useEffect(() => {
        dispatch({ type: GET_CAFES })
    }, []);

    const handleEdit = (data) => {
        //navigate(`/addemployee/${data.id}`);
        navigate('/addcafe', { state: { cafeData: data } });
    }

    const handleDelete = (data) => {
        dispatch({ type: DELETE_CAFE_BY_ID, id: data.id });
    }

    const columnDefs = [
        { headerName: "Cafe ID", field: "id" },
        { headerName: "Name", field: "name" },
        { headerName: "Description", field: "description" },
        { headerName: "Location", field: "location" },
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
            <Grid container alignItems="center" sx={{ mt: '5rem', mb: '2rem' }}>
                <Grid item xs={6}>
                    <Typography variant="h4" >CAFE</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Link to="/addcafe" className="link-tag">
                        <Button variant="contained" color="primary">ADD CAFE</Button>
                    </Link>
                </Grid>
            </Grid>
            <DataTable rowData={rows} columnDefs={columnDefs} />
        </Box>
    );
}

export default Cafe;