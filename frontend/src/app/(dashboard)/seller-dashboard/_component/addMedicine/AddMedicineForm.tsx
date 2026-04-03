"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect } from "react";
import addMedicineServer from "../../_action/addMedicine/addMedicineServer";
import SubmitButton from "@/components/ui/SubmitButton";
import { toast } from "sonner";

export default function AddMedicineForm() {
    const [state, formAction, pending] = useActionState(addMedicineServer, null);
    useEffect(() => {
        if(!state) return; 
        console.log(state.success);
        state.success ? toast.success("Medicine Added!"): toast.error(state.message);
    }, [state, pending])
    return (
        <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg shadow-2xl max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">Details</h2>
            <div className="flex flex-col">
                <Label htmlFor="name" className="mb-1">Medicine Name</Label>
                <Input required id="name" name = "name" placeholder="Enter medicine name (e.g., Azithromycin 250 mg)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="price" className="mb-1">Price (৳)</Label>
                <Input required id="price" name = "price" type="number" placeholder="Enter price (e.g., 250)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="stockQuantity" className="mb-1">Stock Quantity</Label>
                <Input required id="stockQuantity" name = "stockQuantity" type="number" placeholder="Enter available stock quantity (e.g., 30)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="category" className="mb-1">Category</Label>
                <Input required id="category" name = "category" placeholder="Enter categories (e.g., Antibiotic, Painkiller)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="manufacturer" className="mb-1">Manufacturer</Label>
                <Input required id="manufacturer" name = "manufacturer" placeholder="Enter manufacturer name (e.g., Global Pharma Ltd.)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="image" className="mb-1">Image URL</Label>
                <Input required id="image"  name = "image" placeholder="Enter image URL (e.g., https://example.com/image.jpg)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="description" className="mb-1">Description</Label>
                <Textarea required id="description" className="h-37.5" name = "description" placeholder="Enter a brief description of the medicine" rows={4} />
            </div>
            <SubmitButton className="w-full" pending={pending}>Add Medicine</SubmitButton>
        </form>
    );
}