export interface User {
    id: string; // Unique identifier for the user
    name: string; // Full name of the user
    email: string; // Email address of the user
    phone_number?: string; // Optional phone number of the user
    role: string; // Role of the user (e.g., admin, editor, viewer)
    status: "active" | "inactive"; // Status of the user account
    createdAt: Date; // Date when the user was created
    updatedAt: Date; // Date when the user was last updated
}