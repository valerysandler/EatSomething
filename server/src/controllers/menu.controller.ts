import { Response, Request } from "express";
import { Menu } from "../interfaces/product.model";
import { getMenu, createMenuItem, updateMenuItem as updateMenuItemService } from "../services/menu.service";

// Get all menu items
export const getAllMenuItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuItems: Menu[] = await getMenu();
        if (menuItems.length === 0) {
            res.status(404).json({ message: 'No menu items found' });
            return;
        }
        res.status(200).json(menuItems);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching menu items', error: error.message });
    }
};

// Create a new menu item
export const addMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMenuItem: Menu = req.body;
        console.log('Received new menu item data:', newMenuItem);
        // Validate required fields
        if (!newMenuItem.name || !newMenuItem.price) {
            res.status(400).json({ message: 'Name and price are required' });
            return;
        }
        // Create the menu item
        const createdMenuItem: Menu = await createMenuItem(newMenuItem);
        res.status(201).json(createdMenuItem);
    } catch (error: any) {
        res.status(500).json({
            message: 'Error creating menu item',
            error: error.message
        });
    }
};

// Export all functions for use in routes
export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Updating menu item with ID:', req.params.id);
        const menuItemId: number = parseInt(req.params.id, 10);
        const updatedMenuItem: Menu = req.body;
        const result: Menu | null = await updateMenuItemService(menuItemId, updatedMenuItem);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating menu item', error: error.message });
    }
}
