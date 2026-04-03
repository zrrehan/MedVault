"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { envVar } from "./envVar";
import { NextRequest, NextResponse } from "next/server";
export const getUserDetails = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if(!token) return null
    try {
        const decode = jwt.verify(token?.value as string, envVar.jwt_secret as string) as JwtPayload;
        return decode;
    } catch(error: any) {
        return null;
    }
}