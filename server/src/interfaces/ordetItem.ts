export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}