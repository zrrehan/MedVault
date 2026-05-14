"use client";

import { useActionState, useEffect, useState } from "react";
import { getMedicine } from "../../action/getMedicine";
import MedicineInput from "./MedicineInput";
import MiniNavbar from "../../medicines/_component/MiniNavbar";
import Link from "next/link";
import AiChat from "./AIChat";
type Medicine = {
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
        createdAt: string; // or Date if you parse it
        updatedAt: string; // or Date if you parse it
    };

type MedicineResponse = {
    data: Medicine[] 
    [key: string]: any;
}

function MedicineFetch() {
    const [search, setSearch] = useState("");
    const [medicineData, setMedicineData] = useState<MedicineResponse |null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [medicineSelect, setMedicineSelect] = useState<any | null>(null);
    const [sortBy, setSortBy] = useState<string>("none");
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            const data = await getMedicine(search);
            setMedicineData(data as MedicineResponse);
            setLoading(false)
        }
        fetchData();
    }, [search])

    let displayData = medicineData?.data ? [...medicineData.data] : [];

    // Apply Price Range Filter
    if (minPrice !== null) {
        displayData = displayData.filter(m => m.price >= minPrice);
    }
    if (maxPrice !== null) {
        displayData = displayData.filter(m => m.price <= maxPrice);
    }

    // Apply Sort
    if (sortBy === "low-to-high") {
        displayData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
        displayData.sort((a, b) => b.price - a.price);
    }

    let medicineUi = (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">No medicines found</h3>
                <p className="text-sm text-gray-400 max-w-xs">
                    We couldn&apos;t find any results matching <span className="font-medium text-gray-600">&quot;{search}&quot;</span>. Try a different name or keyword.
                </p>
            </div>
            <button
                onClick={() => setSearch("")}
                className="mt-2 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
                Clear search
            </button>
        </div>
    );
    
    if (displayData.length !== 0) {
        medicineUi = <div className="max-w-287.5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((med: any) => (
                <div
                    key={med.id}
                    className="bg-white max-w-screen rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                    {/* Medicine Image */}
                    <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                        <img
                            src={med.image}
                            alt={med.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "https://placehold.co/400x200/f1f5f9/94a3b8?text=No+Image";
                            }}
                        />
                        {/* Stock Badge */}
                        <span
                            className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm border ${med.stockQuantity <= 20
                                ? "bg-red-50 text-red-600 border-red-200"
                                : med.stockQuantity <= 60
                                    ? "bg-amber-50 text-amber-600 border-amber-200"
                                    : "bg-emerald-50 text-emerald-600 border-emerald-200"
                                }`}
                        >
                            {med.stockQuantity <= 20
                                ? "Low Stock"
                                : med.stockQuantity <= 60
                                    ? "Limited"
                                    : "In Stock"}
                        </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                        {/* Name */}
                        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-1">
                            {med.name}
                        </h2>

                        {/* Manufacturer */}
                        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {med.manufacturer}
                        </p>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {med.category.map((cat: string) => (
                                <span
                                    key={cat}
                                    className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-4">
                            {med.description}
                        </p>

                        {/* Footer */}
                        <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Price</p>
                                <p className="text-2xl font-extrabold text-gray-900">BDT {med.price}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 mb-0.5">Stock</p>
                                <p className="text-lg font-bold text-gray-700">
                                    {med.stockQuantity}{" "}
                                    <span className="text-xs font-normal text-gray-400">units</span>
                                </p>
                            </div>
                        </div>
                        {/* View Details Button */}
                        <div className="mt-4">
                            <Link href={`/medicines/${med.id}`}>
                                <button className="w-full bg-black text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200">
                                    View Details
                                </button>
                            </Link>
                            <button
                                onClick={() => {
                                    setMedicineSelect(med);
                                    setModalOpen(true);
                                }}
                                className="w-full mt-2 flex items-center justify-center gap-2 text-sm font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-black hover:bg-gray-50 cursor-pointer transition-all duration-200"
                            >
                                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                </svg>
                                Ask AI
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {
                modalOpen && medicineSelect && <AiChat medicine={medicineSelect} onClose={() => {
                    setModalOpen(false)
                    setMedicineSelect(null)
                }}></AiChat>
            }
        </div>
    }
    return(
        <div>
            <MedicineInput setSearch={setSearch} placeholder="Search By Name"></MedicineInput>
            <MiniNavbar 
                onSort={setSortBy} 
                onPriceRangeChange={(min, max) => {
                    setMinPrice(min);
                    setMaxPrice(max);
                }} 
                currentSort={sortBy} 
                minPrice={minPrice} 
                maxPrice={maxPrice} 
            />
            {
                loading ? <div className="min-h-[300px] flex items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
                                <p className="text-sm text-gray-400">Loading Medicines Data...</p>
                            </div>
                        </div>
                    : medicineUi
            }
        </div>
    )
}

export default MedicineFetch;