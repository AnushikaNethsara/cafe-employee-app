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


app.get('/employee', (req, res) => {
    const employees = [
        { id: '1', name: 'John Doe', email: 'johndoe@example.com', phone: '555-555-5555', gender: 'male', assignedCafe: 'Starbucks', daysWorked: 10 },
        { id: '2', name: 'Jane Doe', email: 'janedoe@example.com', phone: '555-123-4567', gender: 'female', assignedCafe: 'Dunkin Donuts', daysWorked: 7 },
        { id: '3', name: 'Bob Smith', email: 'bobsmith@example.com', phone: '555-987-6543', gender: 'male', assignedCafe: 'Tim Hortons', daysWorked: 14 }
    ];

    res.json(employees);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});