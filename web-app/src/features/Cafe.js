import React from 'react';
import DataTable from './Components/DataTable';

const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
];

const columnDefs = [
    { field: 'Logo' },
    { field: 'Name' },
    { field: 'Description' },
    { field: 'Employees' },
    { field: 'Location' },
    { field: 'Edit/Delete' }
]


const Cafe = () => {
    return (  
        <div>
            <h1>Cafe Page</h1>
            <DataTable rowData={rowData} columnDefs={columnDefs} />
        </div>
    );
}
 
export default Cafe;