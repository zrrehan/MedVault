import config from "../../config";
import { prisma } from "../../lib/prisma"
const stripe = require("stripe")(config.stripe_key);

const soldDataCreatorForPostOrder = async (payload: any, orderId: string) => {
    let soldData = payload.sold_data;
    for (let singleData of soldData) {
        singleData["orderId"] = orderId

        const medicine = await prisma.medicine.findUnique({
            where: {
                id: singleData.medicineId
            }
        })
        singleData["priceAtPurchase"] = medicine?.price
    }
    return soldData
}

const postOrder = async (payload: any) => {
    const userDetils = await prisma.user.findUnique({
        where: {
            id: payload.userId
        }
    })

    if(userDetils?.banned) {
        throw new Error("You Are Banned");
    }

    const orderResult = await prisma.order.create({
        data: {
            userId: payload.userId
        }
    });
    const soldData = await soldDataCreatorForPostOrder(payload, orderResult.id);
    const sold_dataResult = await prisma.soldData.createManyAndReturn({
        data: soldData
    });

    return {...orderResult, sold_dataResult};
}

const getAllOrder = async (userId: string) => {
    return await prisma.order.findMany({
        where: {
            userId: userId, 
        },
        include: {
            sold_data: {
                include: {
                    medicine: true
                }
            }
        }
    })
}

const updateOrderStatus = async (orderId: string, status: "SHIPPED" | "DELIVERED") => {
    return prisma.order.update({
        where: {
            id: orderId
        }, 
        data: {
            delivery_state: status 
        }
    })
}

const updatePaidStatus = async(sessionId: string, orderId: string) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if(session.payment_status != "paid" || session.metadata.orderId !== orderId) {
        throw new Error("Something Went Wrong");
    } 

    return await prisma.order.update({
        where: {
            id: orderId
        }, 
        data: {
            payment_state: "PAID"
        }
    })
}

export const orderServices = {
    postOrder, 
    getAllOrder, 
    updateOrderStatus, 
    updatePaidStatus
}