// User routes
import { Router } from 'express';
import { getAllUsers, addUser, updateUserById, deleteUserById } from '../controllers/user.controller';

const userRouter = Router();

// Route to get all users
userRouter.get('/', getAllUsers);
// Route to create a new user
userRouter.post('/', addUser);
// Route to update an existing user by ID   
userRouter.put('/:id', updateUserById);
// Route to delete a user by ID
userRouter.delete('/:id', deleteUserById);      
// Export the user router
export default userRouter;  