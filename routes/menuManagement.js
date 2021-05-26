const express = require('express');

const Menu = require('../models/menu');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await Menu.findAll({
        attributes: ['menu_no', 'menu_name', 'menu_price', 'menu_stock'],
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const result = await Menu.create({
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
        menu_stock: req.body.menu_stock,
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await Menu.update(
        {menu_stock: req.body.menu_stock},
        {where: {menu_no: req.body.menu_no}}
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Menu.destroy({where: {menu_no: req.body.menu_no}});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
