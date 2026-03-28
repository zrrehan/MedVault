import { prisma } from "../../lib/prisma"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";


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
    const token = jwt.sign(returnedResult, config.jwt_private_key as string);
    return {...returnedResult, token};
}

export const authServices = {
    userSignIn
}