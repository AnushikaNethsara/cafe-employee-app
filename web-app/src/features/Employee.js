import React, { useState } from 'react';
import DataTable from './Components/DataTable';

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
    { field: 'PCafé Name' },
    { field: 'Edit/Delete' }
]
const Employee = () => {
   
    return (
        <div>
            <h1>Employee Page</h1>
            <DataTable rowData={rowData} columnDefs={columnDefs}/>
        </div>
    );
}

export default Employee;