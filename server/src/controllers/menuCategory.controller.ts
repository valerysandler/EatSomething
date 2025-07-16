import { Request, Response } from "express";
import { MenuCategory } from "../interfaces/menuCategort.model";
import { getMenuCategories, createMenuCategory, updateMenuCategory, deleteMenuCategory } from "../services/menuCategory.service";
// Get all menu categories
export const getAllMenuCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories: MenuCategory[] = await getMenuCategories();
        if (categories.length === 0) {
            res.status(404).json({ message: 'No menu categories found' });
            return;
        }
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching menu categories', error: error.message });
    }
};
// Create a new menu category
export const addMenuCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const newCategory: MenuCategory = req.body;
        console.log('Received new menu category data:', newCategory);
        // Validate required fields
        if (!newCategory.name) {
            res.status(400).json({ message: 'Name is required' });
            return;
        }
        // Create the menu category
        const createdCategory: MenuCategory = await createMenuCategory(newCategory);
        res.status(201).json(createdCategory);
    } catch (error: any) {
        res.status(500).json({
            message: 'Error creating menu category',
            error: error.message
        });
    }
};

// Update an existing menu category
export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId: number = parseInt(req.params.id, 10);
        const updatedCategory: MenuCategory = req.body; 
        const result: MenuCategory | null = await updateMenuCategory(categoryId, updatedCategory);      
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Menu category not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating menu category', error: error.message });
    }
};  

// Delete a menu category




// Export all functions for use in routes
export default {
    getAllMenuCategories,
    addMenuCategory,
    updateMenuItem,

};