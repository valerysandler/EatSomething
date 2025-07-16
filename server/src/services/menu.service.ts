// Menu service
import { Menu } from '../interfaces/product.model';
import { Pool } from 'pg';

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Get all menu items
export const getMenu = async (): Promise<Menu[]> => {
    const result = await pool.query('SELECT m.*, c.name AS category_name FROM menu m JOIN menu_categories c ON m.menu_category_id = c.id ');
    return result.rows;
}

// Create a new menu item
export const createMenuItem = async (menuItem: Menu): Promise<Menu> => {
    const result = await pool.query(
        `INSERT INTO menu (
    name,
    price,
    type,
    menu_category_id,
    is_available,
    image_url,
    description
  ) VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`,
        [
            menuItem.name,
            menuItem.price,
            menuItem.type,
            menuItem.menuCategoryId,
            menuItem.isAvailable ?? true,
            menuItem.imageUrl,
            menuItem.description
        ]
    );


    return result.rows[0];
}
// Update an existing menu item
export const updateMenuItem = async (id: number, menuItem: Menu): Promise<Menu | null> => {
    const result = await pool.query(
        `UPDATE menu 
     SET menu_category_id = $1, name = $2, description = $3, 
         price = $4, is_available = $5, updated_at = NOW(), image_url = $6
     WHERE id = $7
     RETURNING *`,
        [
            menuItem.menuCategoryId,
            menuItem.name,
            menuItem.description,
            menuItem.price,
            menuItem.isAvailable,
            menuItem.imageUrl,
            id // ← использовать переданный id
        ]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
};

