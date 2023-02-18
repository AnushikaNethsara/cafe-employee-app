const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const Employee = require('../models/employee');
let Cafe = require('../models/cafe');
const errorMiddleware = require('../middlewares/error_middleware');
const logger = require('../logger/logging');

router.post('/', async (req, res, next) => {
  try {
    const { id, name, email_address, phone_number, gender, cafe, start_date } = req.body;
    const employee = new Employee({ id, name, email_address, phone_number, gender, cafe, start_date });

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

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Employee.deleteOne({ id: req.params.id });
    if (result.deletedCount === 1) {
      logger.info(`successfully deleted employee entity with ${id}`);
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

router.get('/employees', async (req, res, next) => {
  try {
    const cafeId = req.query.cafe;

    const filter = {};
    if (cafeId) {
      filter.cafe = cafeId;
    }

    const employees = await Employee.find(filter).sort({ start_date: -1 });

    res.status(200).json({ employees });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

router.get('/employees', (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      logger.error(err)
      next(err);
    } else {
      logger.info(`successfully fetched all employees`);
      res.status(200).json(employees);
    }
  });
});

router.use(errorMiddleware);

module.exports = router;
