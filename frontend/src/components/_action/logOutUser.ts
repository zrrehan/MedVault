'use server';

import { cookies } from "next/headers";

export async function logOutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}