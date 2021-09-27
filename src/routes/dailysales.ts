import * as express from 'express';
import { getConnection } from 'typeorm';

import { DailySales } from '../entities/DailySales';
import { MenuSlct } from '../entities/MenuSlct';

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .select('dailysales.menu_name', 'menu_name')
        .addSelect('menu_slct.menu_price', 'menu_price')
        .addSelect('dailysales.sales_quantity', 'sales_quantity')
        .addSelect('CAST(menu_price * sales_quantity AS SIGNED)', 'total_price')
        .from(DailySales, 'dailysales')
        .innerJoin(MenuSlct, 'menu_slct', 'dailysales.menu_name = menu_slct.menu_name')
        .execute();
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
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(DailySales)
        .values({
          menu_name: req.body.menu_name,
          sales_quantity: req.body.sales_quantity,
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
        .update(DailySales)
        .set({ sales_quantity: req.body.sales_quantity })
        .where('menu_name = :menu_name', { menu_name: req.body.menu_name })
        .execute();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await getConnection().createQueryBuilder().delete().from(DailySales).execute();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export default router;
