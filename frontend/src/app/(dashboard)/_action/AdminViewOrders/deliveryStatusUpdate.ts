'use server';
import { envVar } from "@/utils/envVar";
import { cookies } from "next/headers";

export async function deliveryStatusUpdate(orderId: string, status: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const url = `${envVar.backend_server}/order/update-status`
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify({
            "orderId": orderId,
            "delivery_status": status
        }),
        cache: "no-store",
    });

    const data =  await res.json();
    console.log(data);
    
}