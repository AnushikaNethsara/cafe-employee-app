const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const Employee = require('../models/employee');
let Cafe = require('../models/cafe');
const errorMiddleware = require('../middlewares/error_middleware');
const logger = require('../logger/logging');

//Add Employee
router.post('/', async (req, res, next) => {
  try {
    const { id, name, email_address, phone_number, gender, cafe } = req.body;
    const employee = new Employee({ id, name, email_address, phone_number, gender, cafe });

    const savedEmployee = await employee.save();
    logger.info(`successfully saved the employee entity with ${id}`);
    res.status(201).json(savedEmployee);

  } catch (error) {
    if (error.name === 'MongoDBError' && error.code === 11000) {
      res.status(400).send({ message: 'An employee with the same ID already works in this cafe.' })
    } else {
      logger.error(error)
      next(error);
    }
  }
});

//Edit Employee
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email_address, phone_number, gender, cafe, start_date } = req.body;
    const employeeId = req.params.id;

    const employee = await Employee.findOne({ id: employeeId });

    if (!employee) {
      logger.info(`not found employee entity with ${employeeId}`);
      return res.status(404).send({ message: 'Employee not found' });
    }

    employee.name = name;
    employee.email_address = email_address;
    employee.phone_number = phone_number;
    employee.gender = gender;
    employee.cafe = cafe;
    employee.start_date = start_date;

    const updatedEmployee = await employee.save();
    logger.info(`successfully updated the employee entity with ${employeeId}`);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    logger.error(err)
    next(error);
  }
});

//Delete Employee
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Employee.deleteOne({ id: req.params.id });
    if (result.deletedCount === 1) {
      logger.info(`successfully deleted employee entity with ${req.params.id}`);
      res.status(200).send("Employee deleted successfully");
    } else {
      logger.info(`not found employee entity with ${req.params.id}`);
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

//Get Employees by Cafe ID
router.get('/employees', async (req, res, next) => {
  const cafeId = req.query.cafe;
  const currentDate = new Date();

  Employee.aggregate([
    {
      $lookup: {
        from: 'cafe_schemas',
        localField: 'cafe',
        foreignField: 'id',
        as: 'cafeDetails'
      }
    },
    {
      $unwind: {
        path: '$cafeDetails',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        id: 1,
        name: 1,
        email_address: 1,
        phone_number: 1,
        gender: 1,
        start_date: 1,
        'cafeDetails.id': 1,
        'cafeDetails.name': 1,
        'cafeDetails.description': 1,
        'cafeDetails.logo': 1,
        'cafeDetails.location': 1,
        days_worked: { $floor: { $divide: [{ $subtract: [currentDate, '$start_date'] }, 86400000] } }
      }
    },
    {
      $match: {
        'cafeDetails.id': cafeId
      }
    },
    {
      $sort: {
        start_date: 1
      }
    }
  ], (err, employees) => {
    if (err) {
      logger.error(err);
      next(err);
    } else {
      console.log(employees)
      logger.info(`successfully fetched employees for cafe with id ${cafeId}`);
      res.status(200).json(employees);
    }
  });
  // try {
  //   const cafeId = req.query.cafe;

  //   const filter = {};
  //   if (cafeId) {
  //     filter.cafe = cafeId;
  //   }

  //   const employees = await Employee.find(filter);

  //   const currentDate = new Date();
  //   const employeesWithDaysWorked = employees.map(employee => ({
  //     id: employee.id,
  //     name: employee.name,
  //     email_address: employee.email_address,
  //     phone_number: employee.phone_number,
  //     days_worked: Math.floor((currentDate - employee.start_date) / (1000 * 60 * 60 * 24)), // calculate days worked
  //     cafe: employee.cafe || '' // use an empty string if cafe is not assigned yet
  //   }));

  //   const sortedEmployees = employeesWithDaysWorked.sort((a, b) => b.days_worked - a.days_worked); // sort by highest number of days worked
  //   console.log(sortedEmployees)
  //   res.status(200).json({ employees: sortedEmployees });
  // } catch (error) {
  //   logger.error(error)
  //   next(error);
  // }
});

//Get all Employees
router.get('/', (req, res, next) => {
  const currentDate = new Date();

  Employee.aggregate([
    {
      $lookup: {
        from: 'cafe_schemas',
        localField: 'cafe',
        foreignField: 'id',
        as: 'cafeDetails'
      }
    },
    {
      $unwind: {
        path: '$cafeDetails',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        id: 1,
        name: 1,
        email_address: 1,
        phone_number: 1,
        gender: 1,
        start_date: 1,
        'cafeDetails.id': 1,
        'cafeDetails.name': 1,
        'cafeDetails.description': 1,
        'cafeDetails.logo': 1,
        'cafeDetails.location': 1,
        days_worked: { $floor: { $divide: [{ $subtract: [currentDate, '$start_date'] }, 86400000] } }
      }
    }
  ], (err, employees) => {
    if (err) {
      logger.error(err);
      next(err);
    } else {
      console.log(employees)
      logger.info(`successfully fetched all employees with cafe details and days worked`);
      res.status(200).json(employees);
    }
  });
});

router.use(errorMiddleware);

module.exports = router;
