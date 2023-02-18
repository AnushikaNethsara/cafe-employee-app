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
      res.status(400).send({message:'An employee with the same ID already works in this cafe.'})
    } else {
      logger.error(error)
      next(error);
    }
  }
});

router.use(errorMiddleware);

module.exports = router;
