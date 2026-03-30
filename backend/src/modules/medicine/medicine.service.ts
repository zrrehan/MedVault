import { prisma } from "../../lib/prisma"

const medicineCreate = async (payload: any) => {
    const result = await prisma.medicine.create({
        data: payload
    })

    return result;
}

const allMedicineGet = async(search: string) => {
    return await prisma.medicine.findMany({
        where: {
            name: {
                contains: search, 
                mode: 'insensitive',
            }
        }
    });
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