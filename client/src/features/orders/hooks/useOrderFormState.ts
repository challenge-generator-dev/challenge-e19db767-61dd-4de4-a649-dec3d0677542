import { CreateOrderDto, OrderItem } from '../types/order.types';

export const validateOrderData = (data: CreateOrderDto): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!data.customerId || data.customerId.trim().length === 0) {
    errors.customerId = 'El ID del cliente es requerido';
  }
  
  if (!data.items || data.items.length === 0) {
    errors.items = 'Debe agregar al menos un ítem';
  }
  
  if (data.totalAmount <= 0) {
    errors.totalAmount = 'El monto total debe ser mayor a 0';
  }
  
  return errors;
};

export const formatOrderData = (data: CreateOrderDto): CreateOrderDto => {
  return {
    customerId: data.customerId.trim(),
    items: data.items.map(item => ({
      ...item,
      productId: item.productId.trim(),
    })),
    totalAmount: Math.round(data.totalAmount * 100) / 100,
  };
};

export const calculateTotalAmount = (items: OrderItem[]): number => {
  if (!items || items.length === 0) return 0;
  
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    return sum + itemTotal;
  }, 0);
  
  return Math.round(subtotal * 100) / 100;
};

export const validateOrderItem = (item: OrderItem): string | null => {
  if (!item.productId || item.productId.trim().length === 0) {
    return 'El ID del producto es requerido';
  }
  
  if (!item.quantity || item.quantity <= 0) {
    return 'La cantidad debe ser mayor a 0';
  }
  
  if (!item.price || item.price < 0) {
    return 'El precio no puede ser negativo';
  }
  
  return null;
};

export const createEmptyOrder = (): CreateOrderDto => ({
  customerId: '',
  items: [],
  totalAmount: 0,
});

export const isOrderValid = (data: CreateOrderDto): boolean => {
  const errors = validateOrderData(data);
  return Object.keys(errors).length === 0;
};

export const normalizeOrderInput = (input: Partial<CreateOrderDto>): CreateOrderDto => {
  return {
    customerId: input.customerId || '',
    items: input.items || [],
    totalAmount: input.totalAmount || 0,
  };
};

export const getOrderSummary = (data: CreateOrderDto): string => {
  const itemCount = data.items?.length || 0;
  const total = data.totalAmount || 0;
  return `${itemCount} ítem(s) - Total: $${total.toFixed(2)}`;
};