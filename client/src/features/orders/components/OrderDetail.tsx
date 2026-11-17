// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React, { useEffect } from 'react';
import { useOrderDetailState } from '../hooks/useOrderDetailState';
import { OrderApiClient } from '../services/order-api.client';
import { Order } from '../types/order.types';

interface OrderDetailProps {
  orderId: string;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  throw new Error('TODO(reto): anonymous');
};

export default OrderDetail;