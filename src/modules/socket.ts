import { Server, Socket } from 'socket.io';
import logger from './winston';
import axios from 'axios';

const webSocket = (server: any, app: any) => {
  const io = new Server(server, { path: '/socket' });
  app.set('io', io);
  const menuSlct = io.of('/api/menu-slct');
  const wishList = io.of('/api/wishlist');
  const orderSheet = io.of('/api/ordersheet');
  const dailySales = io.of('/api/dailysales');

  menuSlct.on('connection', (socket: Socket) => {
    logger.info('Connected on /api/menu-slct');
    socket.on('disconnect', () => {
      logger.info('Disconnect /api/menu-slct');
    });
    socket.on('GET /api/menu-slct Request', async () => {
      const result = await axios.get('http://localhost:3050/api/menu-slct');
      socket.emit('GET /api/menu-slct Success', result.data);
    });

    socket.on('GET /api/menu-mgnt Request', async () => {
      const result = await axios.get('http://localhost:3050/api/menu-mgnt');
      socket.emit('GET /api/menu-mgnt Success', result.data);

      const result1 = await axios.get('http://localhost:3050/api/menu-slct');
      socket.emit('GET /api/menu-slct Success', result1.data);
    });
  });

  wishList.on('connection', (socket: Socket) => {
    logger.info('Connected on /api/wishlist');
    socket.on('disconnect', () => {
      logger.info('Disconnect /api/wishlist');
    });
    socket.on('GET /api/wishlist Request', async (table) => {
      const result = await axios.get(`http://localhost:3050/api/wishlist/${table}`);
      socket.emit('GET /api/wishlist Success', { table: table, data: result.data });
    });
  });

  orderSheet.on('connection', (socket: Socket) => {
    logger.info('Connected on /api/ordersheet');
    socket.on('disconnect', () => {
      logger.info('Disconnect /api/ordersheet');
    });
    socket.on('GET /api/ordersheet Request', async (table) => {
      const result = await axios.get(`http://localhost:3050/api/ordersheet/${table}`);
      socket.emit('GET /api/ordersheet Success', { table: table, data: result.data });
    });
  });

  dailySales.on('connection', (socket: Socket) => {
    logger.info('Connected on /api/dailysales');
    socket.on('disconnect', () => {
      logger.info('Disconnect /api/dailysales');
    });
    socket.on('GET /api/dailysales Request', async () => {
      const result = await axios.get('http://localhost:3050/api/dailysales');
      socket.emit('GET /api/dailysales Success', result.data);
    });
  });
};

export default webSocket;