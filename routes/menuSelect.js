const express = require('express');
const {Op} = require('sequelize');

const Menu = require('../models/menu');
const Order = require('../models/orderSheet');

const router = express.Router();

router
  .route('/:table_no')
  .get(async (req, res, next) => {
    try {
      const result = await Menu.findAll({
        attributes: ['menu_no', 'menu_name', 'menu_price', 'menu_stock'],
        where: {menu_stock: {[Op.gt]: 0}},
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
        menu_no: req.body.menu_no,
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
      const result = await Order.update(
        {order_quantity: req.body.order_quantity},
        {where: {table_no: req.params.table_no, menu_no: req.body.menu_no}}
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
