// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { OrderRepositoryPort } from '../../application/ports/order-repository.port';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { UpdateOrderStateDto } from '../../application/dto/update-order-state.dto';
import { DynamoDBConfig } from '../config/dynamodb.config';

@Injectable()
export class DynamoOrderRepository implements OrderRepositoryPort {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly dynamoConfig: DynamoDBConfig) {
    this.docClient = dynamoConfig.getDocClient();
    this.tableName = dynamoConfig.getTableName();
  }

  async create(orderData: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async save(order: Order): Promise<Order> {
    throw new Error('TODO(reto): save');
  }

  async findById(orderId: string): Promise<Order | null> {
    throw new Error('TODO(reto): findById');
  }

  async updateState(id: string, stateData: UpdateOrderStateDto): Promise<Order> {
    throw new Error('TODO(reto): updateState');
  }

  async delete(orderId: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private toDynamoItem(order: Order): Record<string, any> {
    throw new Error('TODO(reto): toDynamoItem');
  }

  private fromDynamoItem(item: Record<string, any>): Order {
    throw new Error('TODO(reto): fromDynamoItem');
  }
}