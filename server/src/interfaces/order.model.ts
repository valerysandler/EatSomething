import { OrderItem } from "./ordetItem";

export interface Order {
  orderId: number; // вместо id
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}