"use client";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ui/Modal";
import { useState } from "react";
import { deliveryStatusUpdate } from "../../_action/AdminViewOrders/deliveryStatusUpdate";




export default function AllOrdersAdminView({
    order,
    totalItems,
    totalPrice,
}: {
    order: any;
    totalItems: number;
    totalPrice: number;
}) {
    const [deliveryStatus, setDeliveryStatus] = useState(order.delivery_state)
    const [loading, setLoading] = useState(false)
    async function orderActions(orderId:string, delivery_state: string) {
        setLoading(true)
        if(deliveryStatus === "PENDING") {
            setDeliveryStatus("SHIPPED");
            await deliveryStatusUpdate(orderId, "SHIPPED");
            setLoading(false)
        } else if(deliveryStatus === "SHIPPED") {
            setDeliveryStatus("DELIVERED");
            await deliveryStatusUpdate(orderId, "DELIVERED");
            setLoading(false)
        }
    }
    return (
        <div className="border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 bg-white">
            
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-4">
                <div>
                    <p className="text-sm text-gray-400">Order ID</p>
                    <p className="font-semibold text-gray-800 break-all">
                        {order.id}
                    </p>
                </div>

                <div className="flex gap-4 mt-3 sm:mt-0">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Delivery: {deliveryStatus}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                        Payment: {order.payment_state}
                    </span>
                </div>
            </div>

            {/* Medicines */}
            <div className="space-y-5 border-t pt-5">
                {order.sold_data.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex gap-5 items-center border rounded-xl p-4 hover:bg-gray-50 transition"
                    >
                        <img
                            src={item.medicine.image}
                            alt={item.medicine.name}
                            className="w-20 h-20 object-cover rounded-lg border"
                        />

                        <div className="flex-1">
                            <h2 className="font-semibold text-lg text-gray-800">
                                {item.medicine.name}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {item.medicine.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {item.medicine.category.map((cat: string) => (
                                    <span
                                        key={cat}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <p className="text-xs text-gray-400 mt-2">
                                Manufacturer: {item.medicine.manufacturer}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-gray-800">
                                ৳{item.priceAtPurchase}
                            </p>
                            <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-green-600 mt-1">
                                ৳{item.quantity * item.priceAtPurchase}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="border-t mt-6 pt-4 flex justify-between items-center">
                <ConfirmModal
                    trigger={
                        <Button disabled={deliveryStatus === "DELIVERED" || loading} className="px-10 py-4 rounded-xl hover:bg-gray-900 cursor-pointer">
                            {
                                loading && "Please Wait..." ||
                                deliveryStatus === "PENDING" && "Ship Now" ||
                                deliveryStatus === "SHIPPED" && "Deliver Now" ||
                                deliveryStatus === "DELIVERED" && "Delivered"
                            }
                        </Button>
                    }
                    onConfirm={() => orderActions(order.id, order.delivery_state)}
                ></ConfirmModal>
                <p className="text-sm text-gray-500">
                    Total Items:{" "}
                    <span className="font-semibold">{totalItems}</span>
                </p>

                <p className="text-lg font-bold text-gray-800">
                    Total: ৳{totalPrice}
                </p>
            </div>
        </div>
    );
}