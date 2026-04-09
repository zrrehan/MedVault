'use server';
import { envVar } from "@/utils/envVar";

export async function updatePaymentAction(orderId: string, sessionId: string) {
    const url = `${envVar.backend_server}/order/update-paid-status?orderId=${orderId}&sessionId=${sessionId}`;
    const data = await fetch(url, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json", 
        },
        cache: "no-store",
    })
    const response = await data.json();
    return response;
}