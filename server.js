
require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/db');
const authRoutes = require('./Routes/auth-routes');
const homeRoutes = require('./Routes/home-routes');
const adminRoutes = require('./Routes/admin-routes');
const uploadRoutes = require('./Routes/image-routes');

// Connect to the database
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadRoutes);

app.listen(PORT, () => {
    console.log(`The server is connected to port: ${PORT}`);
});

