import SingleMedicine from "../../_component/medicines/SingleMedicine"

async function SingleMedicineDetails({params}: {params: Promise<{ id: string }>}) {
    const {id} = await params
    return (
        <div>
            <h1 className="text-3xl font-bold mx-auto w-fit mt-5">Medicine Details</h1>
            <SingleMedicine id = {id}></SingleMedicine>
        </div>
    )
} 

export default SingleMedicineDetails