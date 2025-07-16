import { Role } from "../types/role";

export interface User {
    id: number;
    name: string; // Full name of the user
    email: string;
    password: string; // In a real application, consider hashing passwords
    createdAt: Date;
    updatedAt: Date;
    phone_number?: string; // Optional field for phone number
    isActive: boolean; // Indicates if the user account is active
    role: Role
}