'use server';

import { envVar } from "@/utils/envVar";
import { cookies } from "next/headers";

export async function updateUserData(name: string, profilePicture: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const url = `${envVar.backend_server}/users/update-own-profile`;
    const data = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify({
            name, profilePicture
        }),
        cache: "no-store",
    })
    const response = await data.json();

    cookieStore.delete("token");
    return response;
}