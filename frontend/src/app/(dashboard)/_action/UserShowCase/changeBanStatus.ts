"use server";

import { cookies } from "next/headers";

export async function changeBanStatus(userId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const url = `http://localhost:8080/users/user-status-change?userId=${userId}`
    const res = await fetch(url, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token?.value}`
        }, 
        cache: "no-store",
    })
    return await res.json();
}