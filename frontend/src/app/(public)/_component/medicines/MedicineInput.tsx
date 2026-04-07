import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

function MedicineInput({ setSearch, placeholder }: any) {
    function handleChange(event: any) {
        setSearch(event.target.value);
    }

    return (
        <div className="my-5 mb-15 w-full max-w-xl mx-auto px-6">
            <Field className="space-y-3">
                {/* The actual search bar - completely new floating card style */}
                <div className="relative group bg-white rounded-3xl shadow-xl border border-gray-100 p-2 hover:shadow-2xl transition-all duration-300 focus-within:shadow-2xl">
                    <div className="relative">
                        {/* Search Icon - bigger, bolder, with smooth color shift */}
                        <svg
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-gray-900 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>

                        <Input
                            id="medicine-search"
                            placeholder={placeholder.concat(" Here")}
                            onChange={handleChange}
                            className="w-full 
                                       bg-transparent 
                                       border-0 
                                       shadow-none 
                                       focus-visible:ring-0 
                                       focus-visible:ring-offset-0 
                                       pl-16 pr-8 py-6 
                                       text-lg font-medium 
                                       text-gray-900 
                                       placeholder:text-gray-400 
                                       rounded-3xl 
                                       transition-all duration-300
                                       hover:bg-gray-50"
                        />
                    </div>
                </div>

                {/* Helpful description - makes it feel premium and guided */}
                <FieldDescription className="text-sm text-gray-500 pl-3">
                    {placeholder} to instantly find the medicine
                </FieldDescription>
            </Field>
        </div>
    )
}

export default MedicineInput