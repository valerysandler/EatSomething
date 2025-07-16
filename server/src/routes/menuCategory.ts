import { Router } from "express";
import { getAllMenuCategories, addMenuCategory, updateMenuItem  } from "../controllers/menuCategory.controller";

// Menu category router for managing menu categories
const menuCategoryRouter = Router();    

// Route to get all menu categories
menuCategoryRouter.get('/', getAllMenuCategories);
// Route to create a new menu category
menuCategoryRouter.post('/', addMenuCategory);     
// Route to update a menu category (not implemented yet)
menuCategoryRouter.put('/:id', updateMenuItem); // Uncomment when implemented



// Export the menu category router
export default menuCategoryRouter;  