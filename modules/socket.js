const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app) => {
  const io = SocketIO(server, {path: '/socket'});
  app.set('io', io);
  const menuMgnt = io.of('/api/menu-mgnt');
  const menuSlct = io.of('/api/menu-slct');
  const wishList = io.of('/api/wishlist');
  const orderSheet = io.of('/api/ordersheet');
  const dailySales = io.of('/api/dailysales');

  menuMgnt.on('connection', (socket) => {
    console.log('Connected on /api/menu-mgnt');
    socket.on('disconnect', () => {
      console.log('Disconnect /api/menu-mgnt');
    });
    socket.on('GET /api/menu-mgnt Request', async () => {
      const result = await axios.get('http://localhost:3050/api/menu-mgnt');
      socket.emit('GET /api/menu-mgnt Success', result.data);
    });
  });

  menuSlct.on('connection', (socket) => {
    console.log('Connected on /api/menu-slct');
    socket.on('disconnect', () => {
      console.log('Disconnect /api/menu-slct');
    });
    socket.on('GET /api/menu-slct Request', async () => {
      const result = await axios.get('http://localhost:3050/api/menu-slct');
      socket.emit('GET /api/menu-slct Success', result.data);
    });
  });

  wishList.on('connection', (socket) => {
    console.log('Connected on /api/wishlist');
    socket.on('disconnect', () => {
      console.log('Disconnect /api/wishlist');
    });
    socket.on('GET /api/wishlist Request', async (table) => {
      const result = await axios.get(`http://localhost:3050/api/wishlist/${table}`);
      socket.emit('GET /api/wishlist Success', {table: table, data: result.data});
    });
  });

  orderSheet.on('connection', (socket) => {
    console.log('Connected on /api/ordersheet');
    socket.on('disconnect', () => {
      console.log('Disconnect /api/ordersheet');
    });
    socket.on('GET /api/ordersheet Request', async (table) => {
      const result = await axios.get(`http://localhost:3050/api/ordersheet/${table}`);
      socket.emit('GET /api/ordersheet Success', {table: table, data: result.data});
    });
  });

  dailySales.on('connection', (socket) => {
    console.log('Connected on /api/dailysales');
    socket.on('disconnect', () => {
      console.log('Disconnect /api/dailysales');
    });
    socket.on('GET /api/dailysales Request', async () => {
      const result = await axios.get('http://localhost:3050/api/dailysales');
      socket.emit('GET /api/dailysales Success', result.data);
    });
  });
};
