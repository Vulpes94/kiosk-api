const express = require('express');

const Sales = require('../models/dailySales');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await Sales.findAll({
        attributes: [
          'sales_no',
          'menu_no',
          'menu_name',
          'sales_quantity',
          'menu_price',
          'total_price',
        ],
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Sales.destroy({truncate: true});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
