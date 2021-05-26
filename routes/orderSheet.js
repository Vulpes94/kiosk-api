const express = require('express');

const Order = require('../models/orderSheet');
const Sales = require('../models/dailySales');

const router = express.Router();

router
  .route('/:table_no')
  .get(async (req, res, next) => {
    try {
      const result = await Order.findAll({
        attributes: ['order_no', 'menu_no', 'menu_name', 'menu_price', 'order_quantity'],
        where: {table_no: req.params.table_no},
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
        menu_no: req.body.menu_no,
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
      const result = await Sales.update(
        {
          sales_quantity: req.body.sales_quantity,
          total_price: req.body.total_price,
        },
        {where: {sales_no: req.body.sales_no}}
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Order.destroy({where: {table_no: req.params.table_no}});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
