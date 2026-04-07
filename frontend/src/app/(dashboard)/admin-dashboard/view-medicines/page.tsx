// page.tsx
"use client";

import { useEffect, useState } from "react";
import AllMedicinesAdminView from "../../_components/Admin-View-orders/AllMedicineAdminView";
import { fetchMedicinesForAdmin } from "../../_action/AdminViewOrders/fetchMedicineForAdmin"; 
import SearchBar from "../../_components/Admin-View-orders/SearchBar";

type Medicine = {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string[];
  manufacturer: string;
  image: string;
  description: string;
  is_active: boolean;
};

export default function ViewMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchMedicinesForAdmin(search);
        console.log("res", res);
        setMedicines(res || []);
      } catch (err) {
        console.error("Failed to fetch medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="max-w-[1200px] w-[92%] mx-auto py-10">

      {/* Search Component */}
      <SearchBar setSearch={setSearch} placeholder="Type Medicine ID or Name"/>

      <h1 className="text-3xl font-bold text-center mb-10 mt-4">
        All Medicines
      </h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20 text-gray-500">
          Loading medicines...
        </div>
      )}

      {/* Empty */}
      {!loading && medicines.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-5xl mb-4">💊</p>
          <p className="text-lg font-semibold">No medicines found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try searching with different keywords.
          </p>
        </div>
      )}

      {/* Medicines */}
      {!loading && medicines.length > 0 && (
        <div className="space-y-10">
          {medicines.map((medicine) => (
            <AllMedicinesAdminView key={medicine.id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
}