
import Head from "next/head";
import MedicineFetch from "../_component/medicines/MedicineFetch";

function Medicines() {
  return (
    <>
      <main className="max-w-screen mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          All Available Medicines
        </h1>

        {/* Medicine list component */}
        <MedicineFetch />
      </main>
    </>
  );
}

export default Medicines;