'use server';
import { envVar } from "@/utils/envVar";
import { cookies } from "next/headers";

export async function fetchOrderForAdmin(search: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const res = await fetch(`${envVar.backend_server}/users/view-orders?search=${search}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        cache: "no-store",
    });

    const data = await res.json();
    const orders = data?.data || [];
    return orders;
}