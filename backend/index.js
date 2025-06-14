require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/Auth');
const productRoutes = require('./routes/Product');
const orderRoutes = require('./routes/Order');
const cartRoutes = require('./routes/Cart');
const brandRoutes = require('./routes/Brand');
const categoryRoutes = require('./routes/Category');
const userRoutes = require('./routes/User');
const addressRoutes = require('./routes/Address');
const reviewRoutes = require('./routes/Review');
const wishlistRoutes = require('./routes/Wishlist');
const { connectToDB } = require('./database/db');

// server init
const server = express();

// database connection
connectToDB();

// middlewares
server.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
server.options('*', cors());
server.use(express.json());
server.use(cookieParser());
server.use(morgan('tiny'));

// routeMiddleware
server.use('/auth', authRoutes);
server.use('/users', userRoutes);
server.use('/products', productRoutes);
server.use('/orders', orderRoutes);
server.use('/cart', cartRoutes);
server.use('/brands', brandRoutes);
server.use('/categories', categoryRoutes);
server.use('/address', addressRoutes);
server.use('/reviews', reviewRoutes);
server.use('/wishlist', wishlistRoutes);

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Catch-all handler: send back React's index.html file for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}
server.get('/', (req, res) => {
  res.status(200).json({ message: 'running' });
});

server.listen(8000, () => {
  console.log('server [STARTED] ~ http://localhost:8000');
});
