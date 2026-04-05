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

export const userServices = {
    getAllUser
}