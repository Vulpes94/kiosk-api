const express = require('express');

const Order = require('../schemas/ordersheet');

const router = express.Router();

router
  .route('/:table')
  .get(async (req, res, next) => {
    try {
      const result = await Order.find({
        table_no: req.params.table,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const result = await Order.create({
        table_no: req.params.table,
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
        order_quantity: req.body.order_quantity,
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await Order.updateOne(
        {table_no: req.params.table, menu_name: req.body.menu_name},
        {order_quantity: req.body.order_quantity}
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Order.remove({table_no: req.params.table});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
