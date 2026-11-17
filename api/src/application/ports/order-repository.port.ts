import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStateDto } from '../dto/update-order-state.dto';

export interface OrderRepositoryPort {
  create(orderData: CreateOrderDto): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  updateState(id: string, stateData: UpdateOrderStateDto): Promise<Order>;
  delete(id: string): Promise<void>;
}

export const ORDER_REPOSITORY_TOKEN = 'OrderRepositoryPort';