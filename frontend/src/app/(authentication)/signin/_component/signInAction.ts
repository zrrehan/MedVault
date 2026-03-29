"use server";

import { envVar } from "@/utils/envVar";
import { cookies } from "next/headers";

export const signInAction = async (state: any, formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const seller = formData.get("seller");
    let role;
    seller ? role = "SELLER" : role = "CUSTOMER";
    

    let data = await fetch(`${envVar.backend_server}/auth/signup`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                email, password, name, role
            }), 
            cache: "no-store"
        });
        const loginInformation = await data.json();
        const cookieStore = await cookies();
        cookieStore.set("token", loginInformation?.data?.token);
        return loginInformation
}