import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @IsPositive()
  totalAmount: number;

  constructor(customerId: string, items: OrderItemDto[], totalAmount: number) {
    this.customerId = customerId;
    this.items = items;
    this.totalAmount = totalAmount;
  }

  validate(): void {
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const calculatedTotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (Math.abs(calculatedTotal - this.totalAmount) > 0.01) {
      throw new Error('Total amount does not match the sum of item prices');
    }
  }
}