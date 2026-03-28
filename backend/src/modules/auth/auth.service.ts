import { prisma } from "../../lib/prisma"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { User } from "../../../generated/prisma/client";


const userSignIn = async (payload: any) => {
    if(payload.role === "ADMIN") throw new Error("Admin can not be created");
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const result = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword, 
            profilePicture: payload.profilePicture, 
            role: payload.role
        }
    })

    const {password, ...returnedResult} = result;
    const token = jwt.sign(returnedResult, config.jwt_private_key as string, {
        expiresIn: "7d"
    });
    return {...returnedResult, token};
}


const userLogin = async (payload: Pick<User, "email" | "password">) => {
    const userData = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    const decoded = await bcrypt.compare(payload.password, userData?.password || "");
    if(!userData || !decoded) throw new Error("Email or Password did not match");

    const {password, ...returnedResult} = userData;
    const token = jwt.sign(returnedResult, config.jwt_private_key as string, {
        expiresIn: "7d"
    });
    return {...returnedResult, token};
}

export const authServices = {
    userSignIn, 
    userLogin
}