import { Pool } from 'pg';

// Создаем пул соединений с PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Функция для подключения и проверки подключения к базе данных
const connectToDatabase = async () => {
    try {
        // Пытаемся выполнить простой запрос, чтобы проверить соединение
        const client = await pool.connect();
        console.log('Connected to PostgreSQL database successfully');
        client.release();  // Освобождаем соединение
    } catch (err: any) {
        console.error('Error connecting to PostgreSQL database:', err.stack);
        throw new Error('Database connection failed');
    }
};

// Экспортируем пул и функцию подключения
export { connectToDatabase };
