import { Pool } from "pg";
import { MenuCategory } from "../interfaces/menuCategort.model";

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Get all menu categories
export const getMenuCategories = async (): Promise<MenuCategory[]> => {     
    const result = await pool.query('SELECT * FROM menu_categories');
    return result.rows;
}

// Create a new menu category
export const createMenuCategory = async (category: MenuCategory): Promise<MenuCategory> => {    
    const result = await pool.query(`
        INSERT INTO menu_categories (name, image_url)
        VALUES ($1, $2)
        RETURNING *
    `, [
        category.name,
        category.imageUrl
    ]);
    return result.rows[0];
}

// Update an existing menu category
export const updateMenuCategory = async (id: number, category: MenuCategory): Promise<MenuCategory | null> => {
    const result = await pool.query(
        `UPDATE menu_categories 
            SET name = $1, image_url = $2, updated_at = NOW()
         WHERE id = $3  
            RETURNING *`,   
        [
            category.name,
            category.imageUrl,  
            id
        ]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
}

// Delete a menu category
export const deleteMenuCategory = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM menu_categories WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
}   




