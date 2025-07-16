// Controller for user-related operations
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { getUsers, createUser, updateUser, deleteUser } from '../services/user.service';
import { Role } from '../types/role';
// Get all users

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await getUsers();
        if (users.length === 0) {
            res.status(404).json({ message: 'No users found' });
            return;
        }
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Create a new user
export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser: User = req.body;
        console.log('Received new user data:', newUser);
        newUser.isActive = newUser.isActive ?? true; // Default to active if not provided
        newUser.role = newUser.role ?? 'user'; // Default role to 'user'    
        // Ensure the role is valid
        if (!Object.values(Role).includes(newUser.role)) {
            res.status(400).json({ message: 'Invalid user role' });
            return;
        }
        // Validate email format if necessary

        // Validate user data if necessary
        if (!newUser.email || !newUser.password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        // Log the new user data for debugging  
        console.log('Adding new user:', newUser);
        const createdUser: User = await createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

// Update an existing user
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id, 10);
        const updatedUser: User = req.body;
        const result: User | null = await updateUser(userId, updatedUser);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({

            message: 'Error updating user',
            error: error.message
        });

    }
};

// Delete a user
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id, 10);
        const result: boolean = await deleteUser(userId);

        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error: any) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
};

// Export all functions for use in routes
export default {
    getAllUsers,
    addUser,            
    updateUserById,
    deleteUserById
};  
