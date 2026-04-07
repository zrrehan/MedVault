'use client';

import { useState } from 'react';
import OrderCard from './OrderCart';


export default function AllOrder({ data }: { data: any }) {
  const orders = data?.data ?? data ?? [];
  const [orderList, setOrderList] = useState(orders);
  console.log(orderList, "###################################################");
  const handleCancel = async (id: string) => {
    // TODO: wire your cancel server action here
    setOrderList((prev: any[]) =>
      prev.map((order: any) =>
        order.id === id ? { ...order, delivery_state: 'CANCELLED' } : order
      )
    );
  };

  const handlePay = async (id: string) => {
    // TODO: wire your payment gateway / redirect here
    console.log('Initiating payment for order:', id);
  };

  if (!orderList || orderList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl mb-4">📦</p>
        <p className="text-lg font-semibold text-black">No orders yet</p>
        <p className="text-sm text-gray-400 mt-1">Your placed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border space-y-10 border-gray-100 px-6 py-2 w-full">
      {orderList.map((order: any) => (
        <OrderCard
          key={order.id}
          order={order}
          onCancel={handleCancel}
          onPay={handlePay}
        />
      ))}
    </div>
  );
}