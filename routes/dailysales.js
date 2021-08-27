const express = require('express');

const Sales = require('../schemas/dailysales');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await Sales.find({});
      const io = req.app.get('io');
      io.of('/api/dailysales').emit('GET /api/dailysales Success', result);
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
        sales_quantity: req.body.sales_quantity,
        menu_price: req.body.menu_price,
        total_price: req.body.total_price,
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
        { menu_name: req.body.menu_name },
        {
          sales_quantity: req.body.sales_quantity,
          total_price: req.body.total_price,
        },
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Sales.deleteMany();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
