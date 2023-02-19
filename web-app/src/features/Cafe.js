import React, { useState, useEffect } from 'react';
import DataTable from './Components/DataTable';
import { Grid, Typography, Button, Box, TextField } from '@mui/material';
import TopBar from './Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CAFES, DELETE_CAFE_BY_ID, GET_CAFE_BY_LOCATION } from '../redux/types';
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


const Cafe = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rows = useSelector(state => state.cafe);
    const [searchText, setSearchText] = useState("");


    React.useEffect(() => {
        dispatch({ type: GET_CAFES })
    }, [navigate]);

    const handleEdit = (data) => {
        navigate('/addcafe', { state: { cafeData: data } });
    }

    const handleView = (data) => {
        navigate('/employee/' + data.id, { state: { cafeData: data } });
    }

    const handleDelete = (data) => {
        dispatch({ type: DELETE_CAFE_BY_ID, id: data.id });
    }

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        if (searchText === "")
            return dispatch({ type: GET_CAFES })
        dispatch({ type: GET_CAFE_BY_LOCATION, location: searchText })
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
                        onClick={() => handleView(params.data)}
                    >
                        <VisibilityIcon />
                    </IconButton>
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
                <Typography variant="h4" sx={{ textAlign: 'center' }}>CAFE LIST</Typography>
                <Link to="/addcafe" className="link-tag" style={{ display: 'inline-block' }}>
                    <Button variant="contained" color="success" startIcon={<AddIcon />}>ADD CAFE</Button>
                </Link>
            </Box>
            <Divider />
            <Box sx={{ mb: '2rem', mt: "2rem" }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%" }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <LocationOnIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Cafe by Location"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={handleSearchTextChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
            <DataTable rowData={rows ? rows : []} columnDefs={columnDefs} />
        </Box>
    );
}

export default Cafe;