// Category controller for handling category-related requests
import { Request, Response } from 'express';
import { Category } from '../models/categoty.model';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/category.service';

// Get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories: Category[] = await getCategories();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Create a new category
export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const newCategory: Category = req.body;
        console.log('Adding new category:', newCategory);
        const createdCategory: Category = await createCategory(newCategory);
        res.status(201).json(createdCategory);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
}

// Update an existing category
export const updateCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId: number = parseInt(req.params.id, 10);
        const updatedCategory: Category = req.body;
        const result: Category | null = await updateCategory(categoryId, updatedCategory);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error: any) {
        res.status(500).json({
            message: 'Error updating category',
            error: error.message
        });
    }
};

// Delete a category
export const deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId: number = parseInt(req.params.id, 10);
        const result: boolean = await deleteCategory(categoryId);

        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error: any) {
        res.status(500).json({
            message: 'Error deleting category',
            error: error.message
        });
    }
};
// Export all controller functions for use in routes
export default {
    getAllCategories,
    addCategory,
    updateCategoryById,
    deleteCategoryById
};
