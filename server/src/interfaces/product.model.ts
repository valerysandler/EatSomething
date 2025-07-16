export interface Menu {
  id: number;
  name: string;
  price: number;
  type: 'kitchen' | 'bar'; // ← добавлено
  menuCategoryId: number;
  isAvailable: boolean;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
