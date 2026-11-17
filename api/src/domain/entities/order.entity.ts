// TODO(reto): archivo stubbeado; implementa los cuerpos.
export class Order {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly totalAmount: number,
    public readonly state: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    if (!id || !customerId) {
      throw new Error('Order must have an id and customerId');
    }
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    if (totalAmount <= 0) {
      throw new Error('Total amount must be positive');
    }
  }

  toPlainObject(): Record<string, unknown> {
    throw new Error('TODO(reto): toPlainObject');
  }

  static fromPlainObject(data: Record<string, unknown>): Order {
    const items = Array.isArray(data.items) 
      ? data.items.map((item: Record<string, unknown>) => OrderItem.fromPlainObject(item))
      : [];
    
    return new Order(
      data.id as string,
      data.customerId as string,
      items,
      data.totalAmount as number,
      data.state as string,
      new Date(data.createdAt as string),
      new Date(data.updatedAt as string),
    );
  }
}

export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly price: number,
  ) {
    if (!productId) {
      throw new Error('OrderItem must have a productId');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    if (price <= 0) {
      throw new Error('Price must be positive');
    }
  }

  getSubtotal(): number {
    return this.quantity * this.price;
  }

  toPlainObject(): Record<string, unknown> {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }

  static fromPlainObject(data: Record<string, unknown>): OrderItem {
    return new OrderItem(
      data.productId as string,
      data.quantity as number,
      data.price as number,
    );
  }
}