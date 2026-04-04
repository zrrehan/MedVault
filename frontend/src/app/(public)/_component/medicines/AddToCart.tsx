"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { addCart, getCart } from "@/utils/cart";
import { toast } from "sonner";

export default function AddToCart({ med }: { med: any }) {
  const [quantity, setQuantity] = useState(1);

  const addMedicineToCart = () => {
    const result = addCart(med.id, quantity);
    result.success ? toast.success(result.message) : toast.error(result.message);
  };

  console.log(getCart());

  const handleQuantityChange = (value: number) => {
    // Clamp the value between 1 and available stock
    const clamped = Math.max(1, Math.min(value, med.stockQuantity));
    setQuantity(clamped);
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-3">
      {/* Quantity Input */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={med.stockQuantity}
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          className="w-20 px-3 py-2 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="text-gray-500 text-sm">/ {med.stockQuantity} available</span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addMedicineToCart}
        disabled={!med.is_active || med.stockQuantity === 0}
        className="w-full flex items-center justify-center gap-2.5 bg-black hover:bg-gray-900 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold text-base py-3.5 rounded-xl transition-colors duration-200 shadow-sm"
      >
        <ShoppingCart className="w-5 h-5" />
        {med.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}