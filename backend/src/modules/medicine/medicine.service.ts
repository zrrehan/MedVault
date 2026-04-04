import { prisma } from "../../lib/prisma"

const medicineCreate = async (payload: any) => {
    const result = await prisma.medicine.create({
        data: payload
    })

    return result;
}

const allMedicineGet = async(search: string, sellerId: string | null, medicineId: string|null) => {
    if(medicineId) {
        return await prisma.medicine.findUnique({
            where: {
                id: medicineId
            }
        })
    }
    
    if(!sellerId) {
        return await prisma.medicine.findMany({
            where: {
                name: {
                    contains: search, 
                    mode: 'insensitive',
                }
            }
        });
    } else {
        return await prisma.medicine.findMany({
            where: {
                name: {
                    contains: search, 
                    mode: 'insensitive',
                }, 
                seller_id: sellerId
            }
        });
    }
    
}

const editMedicine = async(medicineId: string, editedData: any) => {
    return await prisma.medicine.update({
        where: {id: medicineId}, 
        data: editedData
    })
}

export const medicineServices = {
    medicineCreate, 
    allMedicineGet, 
    editMedicine
}