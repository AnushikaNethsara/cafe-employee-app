//imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const employees = [
    { id: '1', name: 'John Doe', email: 'johndoe@example.com', phone: '0772734150', gender: 'male', assignedCafe: 'Starbucks', daysWorked: 10 },
    { id: '2', name: 'Jane Doe', email: 'janedoe@example.com', phone: '0772734151', gender: 'female', assignedCafe: 'Dunkin Donuts', daysWorked: 7 },
    { id: '3', name: 'Bob Smith', email: 'bobsmith@example.com', phone: '0772734152', gender: 'male', assignedCafe: 'Tim Hortons', daysWorked: 14 }
];


app.get('/employee', (req, res) => {
    res.json(employees);
});

app.delete('/employee/:id', (req, res) => {
    const { id } = req.params;
    const index = employees.findIndex((employee) => employee.id === id);

    if (index !== -1) {
        employees.splice(index, 1);
        res.status(200).json({ message: `Employee with ID ${id} has been deleted` });
    } else {
        res.status(404).json({ message: `Employee with ID ${id} not found` });
    }
});

app.put('/employee/:id', (req, res) => {
    const { id } = req.params;
    console.log("edit employee");
    const index = employees.findIndex((employee) => employee.id === id);

    if (index !== -1) {
        employees[index] = { ...employees[index], ...req.body };
        res.status(200).json({ message: `Employee with ID ${id} has been updated` });
    } else {
        res.status(404).json({ message: `Employee with ID ${id} not found` });
    }
});

app.get('/employee/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find((employee) => employee.id === id);

    if (employee) {
        res.status(200).json(employee);
    } else {
        res.status(404).json({ message: `Employee with ID ${id} not found` });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});