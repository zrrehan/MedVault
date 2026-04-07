"use client";

import { useEffect, useState } from "react";
import AllOrdersAdminView from "../../_components/Admin-View-orders/AllOrdersAdminView";
import { fetchOrderForAdmin } from "../../_action/AdminViewOrders/fetchOrderForAdmin";
import SearchBar from "../../_components/Admin-View-orders/SearchBar";

type Order = {
    id: string;
    delivery_state: string;
    payment_state: string;
    userId: string;
    sold_data: any[];
};

function ViewMedicines() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetchOrderForAdmin(search); 
                console.log("res", res);
                setOrders(res || []);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search]); // 🔥 refetch when search changes
    console.log(orders);
    return (
        <div className="max-w-[1200px] w-[92%] mx-auto py-10">

            {/* Search Component */}
            <SearchBar setSearch={setSearch} placeholder="Type Order ID"/>

            <h1 className="text-3xl font-bold text-center mb-10 mt-4">
                All Orders
            </h1>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-20 text-gray-500">
                    Loading orders...
                </div>
            )}

            {/* Empty */}
            {!loading && orders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-5xl mb-4">📦</p>
                    <p className="text-lg font-semibold">No orders found</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Try searching with different keywords.
                    </p>
                </div>
            )}

            {/* Orders */}
            {!loading && orders.length > 0 && (
                <div className="space-y-10">
                    {orders.map((order) => {
                        const totalItems = order.sold_data.reduce(
                            (acc: number, item: any) => acc + item.quantity,
                            0
                        );

                        const totalPrice = order.sold_data.reduce(
                            (acc: number, item: any) =>
                                acc + item.quantity * item.priceAtPurchase,
                            0
                        );

                        return (
                            <AllOrdersAdminView
                                key={order.id}
                                order={order}
                                totalItems={totalItems}
                                totalPrice={totalPrice}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ViewMedicines;