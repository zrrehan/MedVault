import { prisma } from "../../lib/prisma"

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

export const orderServices = {
    postOrder
}