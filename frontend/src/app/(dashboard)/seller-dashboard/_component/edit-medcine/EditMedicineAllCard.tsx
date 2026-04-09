"use client";

import { useEffect, useState } from "react";
import MedicineInput from "@/app/(public)/_component/medicines/MedicineInput";
import Link from "next/link";
import { getMedicineBySellerId } from "../../_action/edit-medicine/getMedicineBySellerId";
import { FaRegEdit } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md"; // logo/icon
import { motion } from "framer-motion";

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

function EditMedicineAllCards() {
    const [search, setSearch] = useState("");
    const [medicineData, setMedicineData] = useState<MedicineResponse |null>(null);
    useEffect(() => {
        const fetchData = async() => {
            const data = await getMedicineBySellerId(search);
            setMedicineData(data as MedicineResponse);
        }
        fetchData();
    }, [search])
    return(
        <div>
            <MedicineInput setSearch={setSearch} placeholder={"Search By Name"}></MedicineInput>
            {
                medicineData?.data.length !== 0 ? 
                    <div className="max-w-287.5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {medicineData?.data?.map((med: any) => (
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
                                        <Link href={`/seller-dashboard/edit-medicine/${med.id}`}>
                                            <button className="w-full bg-black flex items-center justify-center gap-3 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200">
                                                <FaRegEdit size={25} />
                                                <p>Edit Medicine</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <motion.div
                        className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="text-6xl text-gray-300 mb-6 animate-bounce">
                            <MdMedicalServices />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">
                            No Medicines Found
                        </h2>
                        <p className="text-gray-500 max-w-sm">
                            There are currently no medicines to display. Please check back later or add new medicines.
                        </p>
                    </motion.div>
            }
            
        </div>
    )
}

export default EditMedicineAllCards;