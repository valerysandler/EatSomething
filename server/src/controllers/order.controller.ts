import { Response, Request } from "express";

import { Order } from "../interfaces/order.model";
import { createOrder, getOrderById, updateOrder, getAllOrders as getAllOrdersService } from "../services/order.service";

// Get all orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        // You should implement and import getAllOrders from your service if not already present
        const orders: Order[] = await getAllOrdersService();
        if (!orders || orders.length === 0) {
            res.status(404).json({ message: 'No orders found' });
            return;
        }
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Create a new order   
export const addOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const newOrder: Order = req.body;
        // Validate required fields
        if (!newOrder.items || newOrder.items.length === 0 || newOrder.totalAmount === undefined) {
            res.status(400).json({ message: 'Items and total amount are required' });
            return;
        }
        // Create the order
        const createdOrder: Order = await createOrder(newOrder);
        res.status(201).json(createdOrder);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get an order by ID
export const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId: string = req.params.id;
        const order: Order | null = await getOrderById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json(order);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
}

// Update an order
export const updateOrderController = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId: string = req.params.id;
        const updatedOrder: Partial<Order> = req.body;
        const result: Order | null = await updateOrder(orderId, updatedOrder);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
}

// Export all functions for use in routes
export const orderController = {
    addOrder,
    getOrder,
    updateOrderController,
    getAllOrders
};