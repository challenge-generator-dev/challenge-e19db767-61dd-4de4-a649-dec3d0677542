// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStateDto } from '../dto/update-order-state.dto';
import { Order } from '../../domain/entities/order.entity';

export type OrderState = 'created' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const VALID_TRANSITIONS: Record<OrderState, OrderState[]> = {
  created: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
};

@Injectable()
export class OrderService {
  constructor(@Inject('OrderRepositoryPort') private readonly orderRepository: OrderRepositoryPort) {}

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): createOrder');
  }

  async getOrder(orderId: string): Promise<Order> {
    throw new Error('TODO(reto): getOrder');
  }

  async updateOrderState(orderId: string, stateData: UpdateOrderStateDto): Promise<Order> {
    if (!orderId || orderId.trim() === '') {
      throw new BadRequestException('Order ID is required');
    }
    
    const order = await this.orderRepository.findById(orderId);
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    
    return this.orderRepository.updateState(orderId, stateData);
  }

  async deleteOrder(orderId: string): Promise<void> {
    throw new Error('TODO(reto): deleteOrder');
  }

  async transitionOrderState(orderId: string, newState: OrderState): Promise<Order> {
    throw new Error('TODO(reto): transitionOrderState');
  }

  private generateOrderId(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  }
}