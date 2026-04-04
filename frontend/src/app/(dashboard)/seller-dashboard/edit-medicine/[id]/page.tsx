import EditMedicineForm from "../../_component/edit-medicine-by-id/EditMedicineForm"

async function SingleMedicineEdit({params}: {params: Promise<{ id: string }>}) {
    const {id} = await params
    return (
        <div>
            <EditMedicineForm id = {id}></EditMedicineForm>
        </div>
    )
} 

export default SingleMedicineEdit