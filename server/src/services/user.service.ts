// User service CRUD operations
import { User } from '../models/user.model';
import { Pool } from 'pg';
import { Role } from '../types/role';

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


// Get all users
export const getUsers = async (): Promise<User[]> => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

// Create a new user
export const createUser = async (user: User): Promise<User> => {
    // Ensure the user role is valid
    if (!Object.values(Role).includes(user.role)) {
        throw new Error('Invalid user role');
    }
    // Insert user into the database              
    const result = await pool.query(`
  INSERT INTO users (email, password, role, is_active)
  VALUES ($1, $2, $3, $4)
`, [user.email, user.password, user.role, user.isActive]);

    return result.rows[0];
}


// Update an existing user
export const updateUser = async (id: number, user: User): Promise<User | null> => {
    const result = await pool.query(
        'UPDATE users SET email = $1, password = $2, phoneNumber = $3, isActive = $4, role = $5 WHERE id = $6 RETURNING *',
        [user.email, user.password, user.phoneNumber, user.isActive, user.role, id]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
}

// Delete a user
export const deleteUser = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
}

// Export all functions for use in controllers
export default {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};  
