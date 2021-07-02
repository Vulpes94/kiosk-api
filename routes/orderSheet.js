const express = require('express');

const Order = require('../schemas/orderSheet');
const Sales = require('../schemas/dailySales');

const router = express.Router();

router
  .route('/:table_no')
  .get(async (req, res, next) => {
    try {
      const result = await Order.find({
        table_no: req.params.table_no,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const result = await Sales.create({
        menu_name: req.body.menu_name,
        sales_quantity: req.body.order_quantity,
        menu_price: req.body.menu_price,
        total_price: req.body.order_quantity * req.body.menu_price,
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await Sales.updateOne(
        {menu_name: req.body.menu_name},
        {
          sales_quantity: req.body.sales_quantity,
          total_price: req.body.total_price,
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Order.remove({table_no: req.params.table_no});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
