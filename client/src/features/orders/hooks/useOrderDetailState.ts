import { Order, OrderItem } from '../types/order.types';

export const formatOrderDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }
  
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const findOrderItem = (order: Order | undefined, productId: string): OrderItem | undefined => {
  if (!order || !order.items) return undefined;
  return order.items.find(item => item.productId === productId);
};

export const calculateOrderSubtotal = (order: Order | undefined): number => {
  if (!order || !order.items || order.items.length === 0) return 0;
  
  return order.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
};

export const getOrderStateLabel = (state: string): string => {
  const stateLabels: Record<string, string> = {
    PENDING: 'Pendiente',
    PROCESSING: 'Procesando',
    COMPLETED: 'Completado',
    CANCELLED: 'Cancelado',
  };
  
  return stateLabels[state] || state;
};

export const getOrderStateColor = (state: string): string => {
  const stateColors: Record<string, string> = {
    PENDING: '#FFA500',
    PROCESSING: '#4169E1',
    COMPLETED: '#228B22',
    CANCELLED: '#DC143C',
  };
  
  return stateColors[state] || '#808080';
};

export const isOrderEditable = (order: Order | undefined): boolean => {
  if (!order) return false;
  return order.state === 'PENDING' || order.state === 'PROCESSING';
};

export const canCancelOrder = (order: Order | undefined): boolean => {
  if (!order) return false;
  return order.state === 'PENDING' || order.state === 'PROCESSING';
};

export const getOrderItemsCount = (order: Order | undefined): number => {
  if (!order || !order.items) return 0;
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
};

export const formatOrderForDisplay = (order: Order): Record<string, string> => {
  return {
    id: order.id,
    customerId: order.customerId,
    totalAmount: `$${order.totalAmount.toFixed(2)}`,
    state: getOrderStateLabel(order.state),
    createdAt: formatOrderDate(order.createdAt),
    updatedAt: formatOrderDate(order.updatedAt),
    itemsCount: `${order.items.length} ítem(s)`,
  };
};