import { Order } from '../types/order.types';

export const filterOrdersByState = (orders: Order[], state: string): Order[] => {
  if (!state || state === 'ALL') return orders;
  return orders.filter(order => order.state === state);
};

export const filterOrdersByCustomer = (orders: Order[], customerId: string): Order[] => {
  if (!customerId || customerId.trim().length === 0) return orders;
  const normalizedCustomerId = customerId.toLowerCase().trim();
  return orders.filter(order => 
    order.customerId.toLowerCase().includes(normalizedCustomerId)
  );
};

export const sortOrdersByDate = (
  orders: Order[], 
  order: 'asc' | 'desc' = 'desc'
): Order[] => {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const sortOrdersByAmount = (
  orders: Order[], 
  order: 'asc' | 'desc' = 'desc'
): Order[] => {
  return [...orders].sort((a, b) => {
    return order === 'desc' 
      ? b.totalAmount - a.totalAmount 
      : a.totalAmount - b.totalAmount;
  });
};

export const getOrdersByState = (orders: Order[]): Record<string, number> => {
  return orders.reduce((acc, order) => {
    acc[order.state] = (acc[order.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getTotalRevenue = (orders: Order[]): number => {
  return orders
    .filter(order => order.state === 'COMPLETED')
    .reduce((sum, order) => sum + order.totalAmount, 0);
};

export const searchOrders = (orders: Order[], query: string): Order[] => {
  if (!query || query.trim().length === 0) return orders;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return orders.filter(order => 
    order.id.toLowerCase().includes(normalizedQuery) ||
    order.customerId.toLowerCase().includes(normalizedQuery) ||
    order.state.toLowerCase().includes(normalizedQuery)
  );
};

export const paginateOrders = (
  orders: Order[], 
  page: number, 
  pageSize: number
): Order[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return orders.slice(startIndex, endIndex);
};

export const getOrderStats = (orders: Order[]): Record<string, number> => {
  const completed = orders.filter(o => o.state === 'COMPLETED').length;
  const pending = orders.filter(o => o.state === 'PENDING').length;
  const processing = orders.filter(o => o.state === 'PROCESSING').length;
  const cancelled = orders.filter(o => o.state === 'CANCELLED').length;
  
  return {
    total: orders.length,
    completed,
    pending,
    processing,
    cancelled,
  };
};