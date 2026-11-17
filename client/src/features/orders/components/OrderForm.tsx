// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React from 'react';
import { useOrderFormState } from '../hooks/useOrderFormState';
import { CreateOrderDto, Order } from '../types/order.types';

interface OrderFormProps {
  onSuccess?: (order: Order) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
  throw new Error('TODO(reto): anonymous');
};

export default OrderForm;