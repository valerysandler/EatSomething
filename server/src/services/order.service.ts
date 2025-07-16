import { Pool } from 'pg';
import { Order } from '../interfaces/order.model';

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Get all menu items
export const createOrder = async (order: Order): Promise<Order> => {
    // Сначала создаём заказ
    const result = await pool.query(
        `INSERT INTO orders (total_amount, status, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW())
         RETURNING order_id, total_amount, status, created_at, updated_at`,
        [order.totalAmount, order.status]
    );

    const createdOrder = result.rows[0];

    // Добавляем позиции заказа (order_items)
    for (const item of order.items) {
        await pool.query(
            `INSERT INTO order_items (
                order_id, product_id, quantity, price, total_price, created_at, updated_at
            ) VALUES (
                $1, $2, $3, $4, $5, NOW(), NOW()
            )`,
            [
                createdOrder.order_id,    // Foreign key на заказ
                item.productId,           // ID продукта
                item.quantity,            // Кол-во
                item.price,               // Цена за единицу
                item.totalPrice           // Общая цена
            ]
        );
    }

    return {
        orderId: createdOrder.order_id,
        items: order.items,
        totalAmount: createdOrder.total_amount,
        status: createdOrder.status,
        createdAt: createdOrder.created_at,
        updatedAt: createdOrder.updated_at
    };
};
// Get all orders
// (Removed duplicate getAllOrders declaration)

// Get an order by ID
export const getOrderById = async (id: string): Promise<Order | null> => {
    const result = await pool.query(
        `SELECT * FROM orders WHERE id = $1`,
        [id]
    );
    if (result.rows.length === 0) {
        return null;
    }
    const order = result.rows[0];
    const itemsResult = await pool.query(
        `SELECT * FROM order_items WHERE order_id = $1`,
        [id]
    );
    order.items = itemsResult.rows;
    return order;
}

// Update an order
export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order | null> => {
    const fields = [];
    const values = [];
    let index = 1;
    if (order.totalAmount !== undefined) {
        fields.push(`total_amount = $${index++}`);
        values.push(order.totalAmount);
    }
    if (order.status !== undefined) {
        fields.push(`status = $${index++}`);
        values.push(order.status);
    }
    if (fields.length === 0) {
        return null; // No fields to update
    }
    values.push(id);
    const result = await pool.query(
        `UPDATE orders SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${index} RETURNING *`,
        values
    );
    if (result.rows.length === 0) {
        return null; // Order not found
    }
    const updatedOrder = result.rows[0];
    // Update order items if provided
    if (order.items) {
        for (const item of order.items) {
            await pool.query(
                `UPDATE order_items SET quantity = $1, price = $2, total_price = $3, updated_at = NOW() 
                 WHERE id = $4 AND order_id = $5`,
                [item.quantity, item.price, item.totalPrice, item.id, updatedOrder.id]
            );
        }
    }
    return updatedOrder;
}

// Delete an order
export const deleteOrder = async (id: string): Promise<void> => {
    await pool.query(
        `DELETE FROM orders WHERE id = $1`,
        [id]
    );
    await pool.query(
        `DELETE FROM order_items WHERE order_id = $1`,
        [id]
    );
}
// Get all orders
export const getAllOrders = async (): Promise<any[]> => {
  const ordersResult = await pool.query(`SELECT * FROM orders`);
  const orders = ordersResult.rows;

  for (const order of orders) {
    const itemsResult = await pool.query(
      `SELECT product_id, quantity, price, total_price
       FROM order_items
       WHERE order_id = $1`,
      [order.order_id]
    );
    order.items = itemsResult.rows;
  }

  return orders;
};

export default {
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getAllOrders
};