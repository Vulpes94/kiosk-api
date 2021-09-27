import * as express from 'express';
import { getConnection } from 'typeorm';

import { MenuMgnt } from '../entities/MenuMgnt';

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    const result = await getConnection()
      .createQueryBuilder()
      .select('menu_mgnt.menu_name', 'menu_name')
      .addSelect('menu_mgnt.menu_price', 'menu_price')
      .addSelect('menu_mgnt.menu_stock', 'menu_stock')
      .from(MenuMgnt, 'menu_mgnt')
      .execute();
    const io = req.app.get('io');
    io.of('/api/menu-slct').emit('GET /api/menu-mgnt Success', result);
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;