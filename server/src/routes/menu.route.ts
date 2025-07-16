import { Router } from "express";
import { getAllMenuItems, addMenuItem, updateMenuItem } from "../controllers/menu.controller";

// Menu router for managing menu items
const menuRouter = Router();


// Route to get all menu items
menuRouter.get('/', getAllMenuItems);
// Route to create a new menu item
menuRouter.post('/', addMenuItem);  
// Route to update a menu item (not implemented yet)
menuRouter.put('/:id', updateMenuItem); // Uncomment when implemented

// Export the menu router
export default menuRouter;  