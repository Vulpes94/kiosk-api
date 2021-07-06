const express = require('express');

const Wish = require('../schemas/wishlist');

const router = express.Router();

router
  .route('/:table')
  .get(async (req, res, next) => {
    try {
      const result = await Wish.find({
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
      const result = await Wish.create({
        table_no: req.params.table,
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
        wish_quantity: 1,
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await Wish.updateOne(
        {table_no: req.params.table, menu_name: req.body.menu_name},
        {$set: {wish_quantity: req.body.wish_quantity}}
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Wish.deleteOne({
        table_no: req.params.table,
        menu_name: req.body.menu_name,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.delete('/reset/:table', async (req, res, next) => {
  try {
    const result = await Wish.deleteMany({table_no: req.params.table});
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
