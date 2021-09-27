import * as express from 'express';
import { getConnection } from 'typeorm';

import { MenuSlct } from '../entities/MenuSlct';
import { OrderSheet } from '../entities/OrderSheet';

const router = express.Router();

router
  .route('/:table')
  .get(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .select('ordersheet.menu_name', 'menu_name')
        .addSelect('menu_slct.menu_price', 'menu_price')
        .addSelect('ordersheet.order_quantity', 'order_quantity')
        .from(OrderSheet, 'ordersheet')
        .innerJoin(MenuSlct, 'menu_slct', 'ordersheet.menu_name = menu_slct.menu_name')
        .where('table_no = :table_no', { table_no: parseInt(req.params.table) })
        .execute();
      const io = req.app.get('io');
      io.of('/api/ordersheet').emit('GET /api/ordersheet Success', {
        table: req.params.table,
        data: result,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(OrderSheet)
        .values({
          table_no: parseInt(req.params.table),
          menu_name: req.body.menu_name,
          order_quantity: req.body.order_quantity,
        })
        .execute();
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(OrderSheet)
        .set({ order_quantity: req.body.order_quantity })
        .where('table_no = :table_no', { table_no: parseInt(req.params.table) })
        .andWhere('menu_name = :menu_name', { menu_name: req.body.menu_name })
        .execute();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(OrderSheet)
        .where('table_no = :table_no', { table_no: parseInt(req.params.table) })
        .execute();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export default router;
