import 'reflect-metadata';
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';

dotenv.config();
import ORMConfig from './configs/ormconfig';

import logger, { stream } from './modules/winston';
import webSocket from './modules/socket';

import tableMgnt from './routes/table-mgnt';
import menuMgnt from './routes/menu-mgnt';
import menuSlct from './routes/menu-slct';
import wishList from './routes/wishlist';
import orderSheet from './routes/ordersheet';
import dailySales from './routes/dailysales';

const app = express();
app.set('port', process.env.PORT || 3050);
createConnection(ORMConfig)
  .then(() => {
    logger.info('Database Connected!');
  })
  .catch((err) => {
    console.error(err);
  });

const combined =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const dev = ':method :url :status :response-time ms - :res[content-length]';
if (process.env.NODE_ENV === 'production') {
  app.use(morgan(combined, { stream }));
  app.use(helmet());
  app.use(hpp());
  app.use(cors());
} else {
  app.use(morgan(dev, { stream }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/table-mgnt', tableMgnt);
app.use('/api/menu-mgnt', menuMgnt);
app.use('/api/menu-slct', menuSlct);
app.use('/api/wishlist', wishList);
app.use('/api/ordersheet', orderSheet);
app.use('/api/dailysales', dailySales);

app.use((req, res, next) => {
  const err: { name?: string; status?: number } = new Error(
    `${req.method} ${req.url} Router is not exist.`,
  );
  err.name = 'NotFoundError';
  err.status = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).json();
  logger.error(err.stack);
});

const server = app.listen(app.get('port'), () => {
  logger.info(`Listening on Port ${app.get('port')}`);
});

webSocket(server, app);
