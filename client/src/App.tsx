import React from 'react';
import { OrderList } from './features/orders/components/OrderList';
import { OrderForm } from './features/orders/components/OrderForm';
import { OrderDetail } from './features/orders/components/OrderDetail';
import { Order } from './features/orders/types/order.types';

const App: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrderId(order.id);
    setShowCreateForm(false);
  };

  const handleCreateNew = () => {
    setSelectedOrderId(null);
    setShowCreateForm(true);
  };

  const handleOrderCreated = (order: Order) => {
    setSelectedOrderId(order.id);
    setShowCreateForm(false);
  };

  const handleBackToList = () => {
    setSelectedOrderId(null);
    setShowCreateForm(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1>Gestión de Órdenes</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleBackToList} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Lista de Órdenes
          </button>
          <button onClick={handleCreateNew} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Crear Nueva Orden
          </button>
        </nav>
      </header>

      <main>
        {showCreateForm && !selectedOrderId && (
          <OrderForm onSuccess={handleOrderCreated} />
        )}

        {selectedOrderId && !showCreateForm && (
          <OrderDetail orderId={selectedOrderId} />
        )}

        {!selectedOrderId && !showCreateForm && (
          <OrderList onSelectOrder={handleSelectOrder} />
        )}
      </main>
    </div>
  );
};

export default App;