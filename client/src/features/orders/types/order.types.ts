export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDto {
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface UpdateOrderStateDto {
  state: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export enum OrderState {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}