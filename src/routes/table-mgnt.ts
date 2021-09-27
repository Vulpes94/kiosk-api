import * as express from 'express';
import { getConnection } from 'typeorm';

import { TableMgnt } from '../entities/TableMgnt';

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .select('table_mgnt.table_no', 'table_no')
        .addSelect('table_mgnt.table_name', 'table_name')
        .from(TableMgnt, 'table_mgnt')
        .execute();
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
        .into(TableMgnt)
        .values({ table_no: req.body.table_no, table_name: req.body.table_name })
        .execute();
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export default router;
