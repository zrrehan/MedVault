"use server";

import { envVar } from "@/utils/envVar";

export async function getMedicine(search: string = "") {
    const data = await fetch(`${envVar.backend_server}/posts/all-medicine?search=${search}`, {
        cache: "no-store"
    });
    let posts = await data.json();
    return posts;
}