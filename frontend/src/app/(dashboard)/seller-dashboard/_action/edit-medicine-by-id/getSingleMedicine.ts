'use server'

import { envVar } from "@/utils/envVar";

export default async function getMedicineById(medicineId: string) {
    const url = `${envVar.backend_server}/posts/all-medicine?medicineId=${medicineId}`;
    const data = await fetch(url);
    const medicine = await data.json();
    return medicine;
}