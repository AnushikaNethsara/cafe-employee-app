import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const TopBar = ({ title, path, buttonName }) => {
    return (
        <Grid container alignItems="center" sx={{ mt: '5rem', mb: '2rem' }}>
            <Grid item xs={6}>
                <Typography variant="h4" >{title}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Link to={path} className="link-tag">
                    <Button variant="contained" color="primary">{buttonName}</Button>
                </Link>
            </Grid>
        </Grid>
    );
}

export default TopBar;