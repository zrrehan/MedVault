"use client"

import { ShoppingCart } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { orderNow } from "../../action/orderNow"
import { clearCart, getCart } from "@/utils/cart"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function OrderNowButton({ medicineData, setMedicineData }: {medicineData:any, setMedicineData: any}) {
    const router = useRouter(); 
    const totalPrice = medicineData.reduce(
        (acc:any, item:any) => acc + item.price * item.addedValueInCart,
        0
    )

    async function orderHandler() {
        const response = await orderNow(getCart());
        if(!response.success) {
            toast.error(response.message || "Something Went Wrong!");
            if(response.message === "Please Log-In") {
                router.push("/login");
            }
        } else {
            clearCart();
            setMedicineData([]);
            toast.success("Order Confirmed");
        }
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <button className="w-full mt-1 bg-gray-900 hover:bg-gray-800 active:bg-black text-white font-semibold text-base py-3.5 rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Order Now
            </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
            <AlertDialogTitle>Confirm Order</AlertDialogTitle>
            <AlertDialogDescription>
                Review your order details before proceeding.
            </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Order Details */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {medicineData.map((item:any) => (
                <div
                key={item.id}
                className="flex items-center gap-3 border rounded-lg p-3"
                >
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md"
                />

                <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                    Qty: {item.addedValueInCart}
                    </p>
                    <p className="text-sm text-gray-500">
                    ৳{item.price} × {item.addedValueInCart}
                    </p>
                </div>

                <div className="font-semibold">
                    ৳{item.price * item.addedValueInCart}
                </div>
                </div>
            ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t pt-4 mt-2 font-semibold text-lg">
            <span>Total</span>
            <span>৳{totalPrice}</span>
            </div>

            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={orderHandler}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}

export default OrderNowButton