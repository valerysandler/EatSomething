// Category service 
import { Category } from '../models/categoty.model';
import { Pool } from 'pg';

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
}   
// Create a new category
export const createCategory = async (category: Category): Promise<Category> => {
    const result = await pool.query(
        'INSERT INTO categories (name) VALUES ($1) RETURNING *',
        [category.name]
    );
    return result.rows[0];
}   

// Update an existing category
export const updateCategory = async (id: number, category: Category): Promise<Category | null> => {
    const result = await pool.query(
        'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',        
        [category.name, id]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
}
// Delete a category
export const deleteCategory = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    if (result.rowCount !== null && result.rowCount > 0) {
        return true;
    }
    return false; 
}

// Export all functions for use in controllers
export default{
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};