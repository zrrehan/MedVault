import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

function MedicineInput({setSearch}: any) {
    function handleChange(event: any) {
        setSearch(event.target.value);
    }
    return(
        <div className="md:md:w-200   mx-auto my-4">
            <div className="relative group">
                {/* Search Icon */}
                <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-700 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
                </svg>

                <Input
                id="medicine-search"
                placeholder="eg: Paracetamol"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-transparent transition-all duration-200"
                />
            </div>
        </div>
    )
}

export default MedicineInput