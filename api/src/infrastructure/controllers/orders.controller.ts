// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { UpdateOrderStateDto } from '../../application/dto/update-order-state.dto';
import { Order } from '../../domain/entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): Post');
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    throw new Error('TODO(reto): Get');
  }

  @Patch(':id/state')
  async updateOrderState(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStateDto: UpdateOrderStateDto,
  ): Promise<Order> {
    throw new Error('TODO(reto): Patch');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    throw new Error('TODO(reto): Delete');
  }
}