const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cafe = require('../models/cafe');
const uuid = require('uuid');
const Employee = require('../models/employee');
const errorMiddleware = require('../middlewares/error_middleware');
const logger = require('../logger/logging');

//add cafe
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


router.use(errorMiddleware);

module.exports = router;
