import { Router } from "express";
import { getOrder, orderController, getAllOrders, updateOrderController, addOrder } from "../controllers/order.controller";

// Order router for managing orders
const orderRouter = Router();

// Route to get all orders
orderRouter.get('/', orderController.getAllOrders); // Uncomment when implemented
// Route to get an order by ID
orderRouter.get('/:id', getOrder);
// Route to create a new order
orderRouter.post('/', addOrder);
// Route to update an existing order by ID
orderRouter.put('/:id', updateOrderController); // Uncomment when implemented       
// Export the order router
export default orderRouter;