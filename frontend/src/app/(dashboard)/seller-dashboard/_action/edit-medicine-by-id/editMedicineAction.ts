'use server';

import { envVar } from "@/utils/envVar";
import { getUserDetails } from "@/utils/getUserDetails";
import { cookies } from "next/headers";

export default async function editMedicineAction(state: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !key.startsWith("$ACTION_"))
    );
    let {category, price, stockQuantity, id:medicineId, ...restData} = cleanData;
    let rawCategory = cleanData.category as string
    const cleanCategory = rawCategory.split(", ").map(item => item.trim());
    const userData = await getUserDetails()
    const id = userData?.id;
    const payload = {
        medicineId: medicineId, 
        newData: {
            ...restData, 
            is_active: true, 
            seller_id: id,
            category: cleanCategory, 
            price: Number(price), 
            stockQuantity: Number(stockQuantity)
        } 
    }
        
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const url = `${envVar.backend_server}/posts/edit-medicine`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token?.value}`
        }, 
        body: JSON.stringify(payload),
        cache: "no-store",
    })
    const result = await response.json();
    return result;
}