'use server';

import { envVar } from "@/utils/envVar";

export async function paymentAction(body: any) {
    const url = `${envVar.backend_server}/stripe/payment`;
    const data = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({products:body}),
        cache: "no-store",
    })
    const response = await data.json();
    console.log(response);
    return response;
}