const express = require('express');

const Table = require('../schemas/table_mgnt');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await Table.find({});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const result = await Table.create({
        table_no: req.body.table_no,
        table_name: req.body.table_name,
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Table.remove({});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
