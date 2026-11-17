import axios, { AxiosInstance } from 'axios';
import { CreateOrderDto, Order, UpdateOrderStateDto } from '../types/order.types';

const API_BASE_URL = 'http://localhost:3000';

class OrderApiClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await this.client.post<Order>('/orders', orderData);
    return response.data;
  }

  async getOrder(orderId: string): Promise<Order> {
    const response = await this.client.get<Order>(`/orders/${orderId}`);
    return response.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await this.client.get<Order[]>('/orders');
    return response.data;
  }

  async updateOrderState(orderId: string, stateData: UpdateOrderStateDto): Promise<Order> {
    const response = await this.client.patch<Order>(`/orders/${orderId}/state`, stateData);
    return response.data;
  }
}

export const orderApiClient = new OrderApiClient();

export const createOrder = async (orderData: CreateOrderDto): Promise<Order> => {
  return orderApiClient.createOrder(orderData);
};

export const getOrder = async (orderId: string): Promise<Order> => {
  return orderApiClient.getOrder(orderId);
};

export const getOrders = async (): Promise<Order[]> => {
  return orderApiClient.getOrders();
};

export const updateOrderState = async (
  orderId: string, 
  stateData: UpdateOrderStateDto
): Promise<Order> => {
  return orderApiClient.updateOrderState(orderId, stateData);
};

export { OrderApiClient };