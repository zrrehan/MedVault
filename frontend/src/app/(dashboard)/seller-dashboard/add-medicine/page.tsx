import AddMedicineForm from "../_component/addMedicine/AddMedicineForm";

export const metadata = {
  title: "Add Medicine | Pharmacy Dashboard",
  description: "Add new medicines to your inventory with details such as price, category, and manufacturer.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <section>
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Medicine
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Fill in the details below to add a new medicine to your inventory
          </p>
        </header>
        <AddMedicineForm />
      </section>
    </main>
  );
}