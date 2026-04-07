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

async function viewOrders(search: string) {
    return prisma.order.findMany({
        where: {
            id: {
                contains: search, 
                mode: 'insensitive',
            }
        },
        include: {
            sold_data: {
                include: {
                    medicine: true
                }
            }
        }
    });
}
async function viewMedicines(search: string) {
    return prisma.medicine.findMany({
        where: {
            OR: [
                    {
                        id: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
    });
}

export const userServices = {
    getAllUser, 
    userStatusChange, 
    viewMedicines, 
    viewOrders, 
}