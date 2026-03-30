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
        <div className="w-full max-w-sm mx-auto my-4">
            <Field>
                <FieldLabel htmlFor="input-demo-disabled">Search</FieldLabel>
                <Input
                placeholder="eg: Paracetamol"
                onChange={handleChange}
                className="w-full"
                />
            </Field>
        </div>
    )
}

export default MedicineInput