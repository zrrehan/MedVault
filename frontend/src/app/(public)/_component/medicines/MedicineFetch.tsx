"use client";

import { useEffect, useState } from "react";
import { getMedicine } from "../../action/getMedicine";
import MedicineInput from "./MedicineInput";
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
    useEffect(() => {
        const fetchData = async() => {
            const data = await getMedicine(search);
            setMedicineData(data as MedicineResponse);
        }
        fetchData();
    }, [search])
    return(
        <div>
            <MedicineInput setSearch={setSearch}></MedicineInput>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicineData?.data?.map((med:any) => (
                    <div
                        key={med.id}
                        className="border p-4 rounded shadow hover:shadow-md transition"
                        >
                        <h2 className="font-bold text-lg">{med.name}</h2>
                        <p><strong>Price:</strong> ${med.price}</p>
                        <p><strong>Stock:</strong> {med.stockQuantity}</p>
                        <p><strong>Manufacturer:</strong> {med.manufacturer}</p>
                        <p><strong>Category:</strong> {med.category.join(", ")}</p>
                        <p>{med.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MedicineFetch;