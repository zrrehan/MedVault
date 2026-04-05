'use server';
import { envVar } from "@/utils/envVar";
import { getUserDetails } from "@/utils/getUserDetails";
import { cookies } from "next/headers";

export default async function getSinglePersonOrder() {
    const userDetails = await getUserDetails();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const url = `${envVar.backend_server}/order/get-orders`
    const data = await fetch(url, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token?.value}`
        },
        cache: "no-store",
    })
    const response = await data.json();
    return response;
}