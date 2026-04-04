"use server";

import { envVar } from "@/utils/envVar";
import { getUserDetails } from "@/utils/getUserDetails";
import { cookies } from "next/headers";

export async function getMedicineBySellerId(search: string = "") {
    const userData = await getUserDetails();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const data = await fetch(`${envVar.backend_server}/posts/my-posted-medicies?sellerId=${userData?.id}&search=${search}`, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token?.value}`
        },
        cache: "no-store"
    });
    let posts = await data.json();
    return posts;
}