const express = require('express');

const Sales = require('../schemas/dailySales');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await Sales.find({});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Sales.remove();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
