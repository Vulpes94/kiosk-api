import * as express from 'express';
import { getConnection } from 'typeorm';

import { MenuSlct } from '../entities/MenuSlct';

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .select('menu_slct.menu_name', 'menu_name')
        .addSelect('menu_slct.menu_price', 'menu_price')
        .addSelect('menu_slct.menu_stock', 'menu_stock')
        .from(MenuSlct, 'menu_slct')
        .execute();
      const io = req.app.get('io');
      io.of('/api/menu-slct').emit('GET /api/menu-slct Success', result);
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
        .into(MenuSlct)
        .values({
          menu_name: req.body.menu_name,
          menu_price: req.body.menu_price,
          menu_stock: req.body.menu_stock,
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
        .update(MenuSlct)
        .set({ menu_stock: req.body.menu_stock })
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
      const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(MenuSlct)
        .where('menu_name = :menu_name', { menu_name: req.body.menu_name })
        .execute();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export default router;
