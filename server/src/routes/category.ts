// Category router for managing categories
import { Router } from 'express';
import { getAllCategories, addCategory, updateCategoryById, deleteCategoryById } from '../controllers/category.controller';

const categoryRouter = Router();

// Route to get all categories
categoryRouter.get('/', getAllCategories);  
// Route to create a new category
categoryRouter.post('/', addCategory);
// Route to update an existing category by ID
categoryRouter.put('/:id', updateCategoryById);
// Route to delete a category by ID
categoryRouter.delete('/:id', deleteCategoryById);  

// Export the category router
export default categoryRouter;