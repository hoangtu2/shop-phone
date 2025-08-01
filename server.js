const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(express.json());
connectDB()
// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/phone-shop', {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// });
const PORT = process.env.PORT || 5001;
// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Local: http://localhost:${PORT}`);
    
});