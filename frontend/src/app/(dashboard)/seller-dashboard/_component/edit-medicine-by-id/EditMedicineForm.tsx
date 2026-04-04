"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import addMedicineServer from "../../_action/addMedicine/addMedicineServer";
import SubmitButton from "@/components/ui/SubmitButton";
import { toast } from "sonner";
import getMedicineById from "../../_action/edit-medicine-by-id/getSingleMedicine";
import editMedicineAction from "../../_action/edit-medicine-by-id/editMedicineAction";
import { useRouter } from "next/navigation";
interface Medicine {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  seller_id: string;
  category: string[];
  is_active: boolean;
  manufacturer: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditMedicineForm({id}:{id:string}) {
    const [medicineData, setMedicineData] = useState<Medicine | null>(null);
    const [state, formAction, pending] = useActionState(editMedicineAction, false);
    const router = useRouter();
    useEffect(() => {
        async function getData() {
            const data = await getMedicineById(id);
            setMedicineData(data.data);
        }
        getData();
    }, [])

    useEffect(() => {
        if(!state) return; 
        console.log(state.success);
        if(state.success) {
            toast.success(state.message);
            router.push("/seller-dashboard/edit-medicine")
        } else {
            toast.error(state.message || "Something Went Wrong");
        }
    }, [state, pending])
    
    return(
        <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg shadow-2xl max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">EDIT Medicine</h2>
            <input type="hidden" name="id" value={medicineData?.id || ""}></input>
            <div className="flex flex-col">
                <Label htmlFor="name" className="mb-1">Medicine Name</Label>
                <Input defaultValue={medicineData?.name} required id="name" name = "name" placeholder="Enter medicine name (e.g., Azithromycin 250 mg)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="price" className="mb-1">Price (৳)</Label>
                <Input defaultValue={medicineData?.price} required id="price" name = "price" type="number" placeholder="Enter price (e.g., 250)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="stockQuantity" className="mb-1">Stock Quantity</Label>
                <Input defaultValue={medicineData?.stockQuantity} required id="stockQuantity" name = "stockQuantity" type="number" placeholder="Enter available stock quantity (e.g., 30)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="category" className="mb-1">Category</Label>
                <Input defaultValue={medicineData?.category.join(", ")} required id="category" name = "category" placeholder="Enter categories (e.g., Antibiotic, Painkiller)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="manufacturer" className="mb-1">Manufacturer</Label>
                <Input defaultValue={medicineData?.manufacturer} required id="manufacturer" name = "manufacturer" placeholder="Enter manufacturer name (e.g., Global Pharma Ltd.)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="image" className="mb-1">Image URL</Label>
                <Input required id="image" defaultValue={medicineData?.image} name = "image" placeholder="Enter image URL (e.g., https://example.com/image.jpg)" />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="description" className="mb-1">Description</Label>
                <Textarea defaultValue={medicineData?.description} required id="description" className="h-37.5" name = "description" placeholder="Enter a brief description of the medicine" rows={4} />
            </div>
            <SubmitButton className="w-full" pending={pending}>Update Medicine</SubmitButton>
        </form>
    )
}