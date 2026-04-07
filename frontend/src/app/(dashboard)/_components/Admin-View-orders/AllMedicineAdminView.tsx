// AllMedicinesAdminView.tsx
export default function AllMedicinesAdminView({ medicine }: { medicine: any }) {
  return (
    <div className="border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 bg-white">

      {/* Medicine Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-400">Medicine ID</p>
          <p className="font-semibold text-gray-800 break-all">{medicine.id}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            medicine.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {medicine.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Medicine Details */}
      <div className="flex gap-5 items-center border-t pt-5">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-24 h-24 object-cover rounded-lg border"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-lg text-gray-800">{medicine.name}</h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-3">{medicine.description}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {medicine.category.map((cat: string) => (
              <span key={cat} className="text-xs bg-gray-100 px-2 py-1 rounded">{cat}</span>
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-600">Manufacturer: {medicine.manufacturer}</p>
          <p className="mt-1 text-sm text-gray-800 font-semibold">Price: ৳{medicine.price}</p>
          <p className="mt-1 text-sm text-gray-600">Stock: {medicine.stockQuantity}</p>
        </div>
      </div>
    </div>
  );
}