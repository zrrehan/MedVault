"use server"
import { envVar } from "@/utils/envVar";
import { getUserDetails } from "@/utils/getUserDetails";
import { cookies } from "next/headers";

export async function orderNow(payload: any) {
    const userDetails = await getUserDetails();
    if(!userDetails) {
        return {
            success: false, 
            message: "Please Log-In"
        }
    }
    const sentData = {
        userId: userDetails?.id,
        sold_data: payload
    }
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const url = `${envVar.backend_server}/order/post-order`;


    const data = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify(sentData),
        cache: "no-store",
    })
    const res = await data.json();
    return res;
}