// components/AllItemInCart.tsx
"use client";

import { getCart, removeCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import getMedicineById from "@/app/(dashboard)/seller-dashboard/_action/edit-medicine-by-id/getSingleMedicine";
import SingleCart from "./SingleCart";
import { ShoppingCart } from "lucide-react";
import emptyCart from "../../../../../public/emptyCart.png";
import Image from "next/image";
import { GiMedicines } from "react-icons/gi";
import Link from "next/link";

interface Medicine {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  seller_id: string;
  category: string[];
  is_active: boolean;
  manufacturer: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  addedValueInCart: number;
}

export default function AllItemInCart() {
  const [medicineData, setMedicineData] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartItems = getCart();
    const fetchAll = async () => {
      const results = await Promise.all(
        cartItems.map(async (item: { medicineId: string; quantity: number }) => {
          const data = await getMedicineById(item.medicineId);
          return { ...data?.data, addedValueInCart: item.quantity } as Medicine;
        })
      );
      setMedicineData(results.filter(Boolean));
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleDelete = (id: string) => {
    setMedicineData((prev) => prev.filter((med) => med.id !== id));
    removeCart(id);
  };

  const totalItems = medicineData.reduce((acc, med) => acc + med.addedValueInCart, 0);
  const totalPrice = medicineData.reduce((acc, med) => acc + med.price * med.addedValueInCart, 0);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (medicineData.length === 0) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center gap-3 text-gray-400">
        {/* <ShoppingCart className="w-12 h-12 text-gray-200" /> */}
        <Image
            src={emptyCart}
            alt="Empty Cart"
            width={300}      // set desired width
            height={300}     // set desired height
            className="mx-auto"
        />
        <p className="font-medium text-4xl">Your cart is empty</p>
        <Link href = "/medicines">
            <button className="w-[90%] md:w-125 cursor-pointer mt-1 bg-gray-900 hover:bg-gray-800 active:bg-black text-white font-semibold text-base py-3.5 rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-2">
                <GiMedicines  className="w-5 h-5" />
                View Medicines
            </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <span className="text-sm text-gray-400 font-medium">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-3">
          {medicineData.map((med) => (
            <SingleCart key={med.id} singleMedicine={med} onDelete={handleDelete} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Order Summary
          </h2>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span className="font-medium text-gray-800">৳{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-medium text-gray-800">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-xl font-extrabold text-gray-900">
              ৳{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Order Now */}
          <button className="w-full mt-1 bg-gray-900 hover:bg-gray-800 active:bg-black text-white font-semibold text-base py-3.5 rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Order Now
          </button>
        </div>

      </div>
    </div>
  );
}