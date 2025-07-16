export interface Product {
    id: number; // Unique identifier for the product
    name: string; // Name of the product
    description?: string; // Optional description of the product
    price: number; // Price of the product
    categoryId: number; // Foreign key to the category this product belongs to
    isAvailable: boolean; // Indicates if the product is currently available
    createdAt: Date; // Timestamp when the product was created
    updatedAt: Date; // Timestamp when the product was last updated
    imageUrl?: string; // Optional URL for the product image
    isAvailableForOrder?: boolean; // Indicates if the product can be ordered
}