"use server";

import getMedicineById from "@/app/(dashboard)/seller-dashboard/_action/edit-medicine-by-id/getSingleMedicine";
import { ShoppingCart, Package, Building2, Tag, Clock, CheckCircle, XCircle } from "lucide-react";
import AddToCart from "./AddToCart";

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
}

interface SingleMedicineProps {
  id: string;
}

export default async function SingleMedicine({ id }: SingleMedicineProps) {
  // Fetch data server-side
  const response = await getMedicineById(id);
  const med: Medicine | null = response?.data ?? null;

  if (!med) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Medicine not found.</p>
      </div>
    );
  }

  const stockBadge =
    med.stockQuantity <= 20
      ? { label: "Low Stock", classes: "bg-red-50 text-red-600 border-red-200" }
      : med.stockQuantity <= 60
      ? { label: "Limited", classes: "bg-amber-50 text-amber-600 border-amber-200" }
      : { label: "In Stock", classes: "bg-emerald-50 text-emerald-600 border-emerald-200" };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Top Section — Image + Core Info */}
          <div className="flex flex-col sm:flex-row gap-0">

            {/* Image */}
            <div className="relative sm:w-72 sm:shrink-0 bg-gray-50 flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-gray-100 min-h-[220px]">
              <img
                src={med.image}
                alt={med.name}
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-xl"
              />
              {/* Stock badge */}
              <span
                className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm border ${stockBadge.classes}`}
              >
                {stockBadge.label}
              </span>
            </div>

            {/* Core Info */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between gap-4">
              {/* Name + Status */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {med.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                    med.is_active
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {med.is_active ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {med.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {med.category.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {cat}
                  </span>
                ))}
              </div>

              {/* Price + Stock */}
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Price</p>
                  <p className="text-3xl font-extrabold text-gray-900">৳{med.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Stock</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {med.stockQuantity}
                    <span className="text-sm font-normal text-gray-400 ml-1">units</span>
                  </p>
                </div>
              </div>

              {/* Manufacturer */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Building2 className="w-4 h-4 shrink-0 text-gray-400" />
                <span>{med.manufacturer}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Description */}
          <div className="p-6 sm:p-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{med.description}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Meta Info */}
          <div className="px-6 sm:px-8 py-5 bg-gray-50/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>
                <span className="text-gray-400">Added:</span>{" "}
                <span className="text-gray-600 font-medium">{formatDate(med.createdAt)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>
                <span className="text-gray-400">Updated:</span>{" "}
                <span className="text-gray-600 font-medium">{formatDate(med.updatedAt)}</span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Add to Cart Button */}
          <AddToCart med={med}></AddToCart>
        </div>
      </div>
    </div>
  );
}