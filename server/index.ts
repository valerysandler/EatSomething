// Add PostgreSQL connection pg configuration
import * as dotenv from 'dotenv';
dotenv.config(); // для загрузки переменных окружения из .env файла
import { connectToDatabase } from './src/config/db';
import express from 'express';
import cors from 'cors';
import categoryRouter from './src/routes/category.route';
import userRouter from './src/routes/user.route';
import menuRouter from './src/routes/menu.route'; 
import menuCategoryRouter from './src/routes/menuCategory.route';
import orderRouter from './src/routes/order.route';

// Connect to PostgreSQL database
connectToDatabase();

const server = express();

// Middleware to parse JSON requests
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Middleware for CORS
server.use(cors());


// Example route
server.get('/', (req, res) => {
    res.send('Welcome to the Cafe Management System!');
});

// Import order routes
// Use order routes
server.use('/orders', orderRouter);
// Use category routes
server.use('/categories', categoryRouter);
// Import user routes
// Use user routes
server.use('/users', userRouter);
// Import menu routes
// Use menu routes
server.use('/menu', menuRouter);
// Import menu category routes
// Use menu category routes
server.use('/menu-categories', menuCategoryRouter);


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

