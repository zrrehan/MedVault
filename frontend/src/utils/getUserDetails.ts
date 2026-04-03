"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { envVar } from "./envVar";
export const getUserDetails = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const decode = jwt.verify(token?.value as string, envVar.jwt_secret as string) as JwtPayload;
    return decode;
}