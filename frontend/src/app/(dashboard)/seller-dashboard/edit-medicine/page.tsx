import EditMedicineAllCards from "../_component/edit-medcine/EditMedicineAllCard";

function EditMedicine() {
    return(
        <>
            <main className="max-w-screen mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Your Posted Medicines
                </h1>

                {/* Medicine list component */}
                <EditMedicineAllCards></EditMedicineAllCards>
            </main>
        </>
    )
}

export default EditMedicine;

