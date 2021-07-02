const express = require('express');

const Menu = require('../schemas/menu');
const Order = require('../schemas/orderSheet');

const router = express.Router();

router
  .route('/:table_no')
  .get(async (req, res, next) => {
    try {
      const result = await Menu.find({
        menu_stock: {$gt: 0},
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
        table_no: req.params.table_no,
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
        {table_no: req.params.table_no, menu_name: req.body.menu_name},
        {order_quantity: req.body.order_quantity}
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
