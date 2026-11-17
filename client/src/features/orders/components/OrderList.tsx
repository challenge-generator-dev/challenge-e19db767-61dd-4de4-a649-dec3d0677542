// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React from 'react';
import { useOrderListState } from '../hooks/useOrderListState';
import { OrderApiClient } from '../services/order-api.client';
import { Order } from '../types/order.types';

interface OrderListProps {
  onSelectOrder?: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ onSelectOrder }) => {
  throw new Error('TODO(reto): anonymous');
};

export default OrderList;