"use server";

import { envVar } from "@/utils/envVar";
import { cookies } from "next/headers";

export async function loginServer(state: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    
    let data = await fetch(`${envVar.backend_server}/auth/login`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            email, password
        }), 
        cache: "no-store"
    });
    const loginInformation = await data.json();
    
    const cookieStore = await cookies();
    cookieStore.set("token", loginInformation?.data?.token);
    return loginInformation;
 }