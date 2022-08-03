import * as express from 'express';
import { getConnection } from 'typeorm';

import { MenuSlct } from '../entities/MenuSlct';
import { WishList } from '../entities/WishList';

const router = express.Router();

router
  .route('/:table')
  .get(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .select('wishlist.menu_name', 'menu_name')
        .addSelect('menu_slct.menu_price', 'menu_price')
        .addSelect('wishlist.wish_quantity', 'wish_quantity')
        .from(WishList, 'wishlist')
        .innerJoin(MenuSlct, 'menu_slct', 'wishlist.menu_name = menu_slct.menu_name')
        .where('table_no = :table_no', { table_no: parseInt(req.params.table) })
        .execute();
      const io = req.app.get('io');
      io.of('/api/wishlist').emit('GET /api/wishlist Success', {
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
        .into(WishList)
        .values({
          table_no: parseInt(req.params.table),
          menu_name: req.body.menu_name,
          wish_quantity: 1,
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
        .update(WishList)
        .set({ wish_quantity: req.body.wish_quantity })
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
        .from(WishList)
        .where('table_no = :table_no', { table_no: parseInt(req.params.table) })
        .andWhere('menu_name = :menu_name', { menu_name: req.body.menu_name })
        .execute();
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// transaction WishList increment
router.patch('/incr/:table', async (req, res, next) => {
  try {
    const result = await getConnection().transaction(async (manager)=>{
      await manager.increment(WishList, {table_no: parseInt(req.params.table), menu_name: req.body.menu_name},"wish_quantity",1);
      await manager.decrement(MenuSlct,{menu_name: req.body.menu_name },"menu_stock",1);
    });
    res.json(result);
  }catch (err) {
    console.error(err);
    next(err);
  }
});

// transaction WishList decrement
router.patch('/decr/:table', async (req, res, next) => {
  try {
    const result = await getConnection().transaction(async (manager)=>{
      await manager.decrement(WishList, {table_no: parseInt(req.params.table), menu_name: req.body.menu_name},"wish_quantity",1);
      await manager.increment(MenuSlct,{menu_name: req.body.menu_name },"menu_stock",1);
    });
    res.json(result);
  }catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/reset/:table', async (req, res, next) => {
  try {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(WishList)
      .where('table_no = :table_no', { table_no: parseInt(req.params.table) })
      .execute();
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
