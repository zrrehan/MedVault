'use client';

import { useState } from 'react';
import OrderCard from './OrderCart';
import {loadStripe} from '@stripe/stripe-js';
import { envVar } from '@/utils/envVar';
import { paymentAction } from '../_action/payment';


export default function AllOrder({ data }: { data: any }) {
  const orders = data?.data ?? data ?? [];
  const [orderList, setOrderList] = useState(orders);
  const handleCancel = async (id: string) => {
    // TODO: wire your cancel server action here
    setOrderList((prev: any[]) =>
      prev.map((order: any) =>
        order.id === id ? { ...order, delivery_state: 'CANCELLED' } : order
      )
    );
  };

  const OrderShowcaseForStripe = (order: any) => {
    const data = []
    // console.log(order);
    for(let singleOrder of order.sold_data) {
      const singledata =  {
        name: singleOrder.medicine.name,
        price: singleOrder.medicine.price, 
        image: singleOrder.medicine.image, 
        quantity: singleOrder.quantity, 
        total: singleOrder.medicine.price * singleOrder.quantity
      }
      data.push(singledata);
    }
    return data;
  }

  const handlePay = async (id: string, payment: number, order: any) => {
    console.log(envVar.stripe_key);
    const stripe = await loadStripe(envVar.stripe_key as string);
    const body = OrderShowcaseForStripe(order);
    
    const data = await paymentAction(body);
    window.location.href = data.url;

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