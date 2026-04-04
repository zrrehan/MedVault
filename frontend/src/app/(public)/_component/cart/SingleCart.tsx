// components/SingleCart.tsx
"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

interface SingleCartProps {
  singleMedicine: any;
  onDelete: (id: string) => void;
}

export default function SingleCart({ singleMedicine, onDelete }: SingleCartProps) {
  const med = singleMedicine;
  const subtotal = med.price * med.addedValueInCart;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* Image */}
      <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden">
        <img src={med.image} alt={med.name} className="w-16 h-16 object-contain" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-semibold text-gray-900 truncate">{med.name}</h3>
        <p className="text-lg text-gray-400 mt-0.5">{med.manufacturer}</p>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {med.category.map((cat: string) => (
            <span
              key={cat}
              className="text-[15px] font-medium bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        <p className="text-lg text-gray-400 mt-1.5">
          Unit price:{" "}
          <span className="text-gray-800 font-semibold">৳{med.price}</span>
          <span className="mx-2 text-gray-300">|</span>
          Qty: <span className="text-gray-800 font-semibold">{med.addedValueInCart}</span>
        </p>
      </div>

      {/* Subtotal + Actions */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">

        {/* Subtotal */}
        <p className="text-base font-extrabold text-gray-900">
          ৳{subtotal.toLocaleString()}
        </p>

        {/* Change Quantity Button */}
        <Link
          href={`/medicines/${med.id}`}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 whitespace-nowrap"
        >
          Change Quantity
        </Link>

        {/* Delete */}
        <button
          onClick={() => onDelete(med.id)}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}