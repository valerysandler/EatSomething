import { OrderItem } from "./ordetItem";

export interface Order {
    id: string;
    items: OrderItem[]; 
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}