const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cafe = require('../models/cafe');
const uuid = require('uuid');
const Employee = require('../models/employee');
const errorMiddleware = require('../middlewares/error_middleware');
const logger = require('../logger/logging');

//Add cafe
router.post('/', async (req, res, next) => {
  try {
    const { name, description, logo, location } = req.body;
    const cafeId = `CAFE_${uuid.v4()}`;
    const cafe = new Cafe({ name, description, logo, location, id: cafeId });
    const savedCafe = await cafe.save();
    logger.info(`successfully saved the cafe entity with ${cafeId}`);
    res.status(201).json(savedCafe);
  } catch (err) {
    logger.error(err)
    next(err);
  }
});

// Update an existing cafe
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, logo, location } = req.body;
    const cafe = await Cafe.findOneAndUpdate({ id: id }, { name, description, logo, location }, { new: true });
    if (!cafe) {
      logger.info(`not found cafe entity with ${id}`);
      return res.status(404).send({ message: 'Cafe not found' });
    }
    res.status(200).json(cafe);
  } catch (err) {
    logger.error(err)
    next(err);
  }
});

// Delete a cafe
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cafe = await Cafe.findOneAndDelete({ id });
    if (!cafe) {
      logger.info(`not found cafe entity with ${id}`);
      return res.status(404).send({ message: 'Cafe not found' });
    }
    await Employee.deleteMany({ cafe: cafe.id });
    logger.info(`successfully deleted cafe entity with ${id}`);
    res.send('Cafe and its employees have been deleted');
  } catch (err) {
    logger.error(err)
    next(err);
  }
});

// Get cafes by location
router.get('/', async (req, res, next) => {
  try {
    const location = req.query.location;
    const regex = new RegExp(location, 'i'); // 'i' makes it case-insensitive
    const cafes = await Cafe.find({ location: regex });
    const cafeEmployeesPromises = cafes.map(async (cafe) => {
      const employeesCount = await Employee.countDocuments({ cafe: cafe.id });
      return { ...cafe.toObject(), employees_count: employeesCount };
    });
    const cafeEmployees = await Promise.all(cafeEmployeesPromises);
    const sortedCafes = cafeEmployees.sort((a, b) => b.employees_count - a.employees_count);
    logger.info(`successfully fetched cafes`);
    res.status(200).json(sortedCafes);
  } catch (err) {
    logger.error(err)
    next(err);
  }
});

//get all cafes
router.get('/cafes', (req, res) => {
  Cafe.find({}, (err, cafes) => {
    if (err) {
      logger.error(err)
      next(err);
    } else {
      logger.info(`successfully fetched all cafes`);
      res.status(200).json(cafes);
    }
  });
});


router.use(errorMiddleware);

module.exports = router;
