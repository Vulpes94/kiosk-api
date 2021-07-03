const express = require('express');

const Menu = require('../schemas/menu_mgnt');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await Menu.find({});
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
      const result = await Menu.updateOne({_id: req.body._id}, {menu_stock: req.body.menu_stock});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Menu.remove({_id: req.body._id});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
