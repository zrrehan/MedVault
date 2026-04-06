import { prisma } from "../../lib/prisma";

async function getAllUser() {
    return await prisma.user.findMany({
        where: {
            role: {
                in: ["CUSTOMER", "SELLER"]
            }
        }
    });
}

const userStatusChange = async (userId: string) => {
    const result = await prisma.user.findUnique({where: {id: userId}})
    return await prisma.user.update({
        where: {
            id: userId
        }, 
        data: {
            banned: !result?.banned
        }
    })
}

export const userServices = {
    getAllUser, 
    userStatusChange
}