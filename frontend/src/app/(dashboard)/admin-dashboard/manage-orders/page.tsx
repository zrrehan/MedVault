import { envVar } from "@/utils/envVar";
import { cookies } from "next/headers";
import AllOrdersAdminView from "../../_components/Admin-View-orders/AllOrdersAdminView";

async function ViewMedicines() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const res = await fetch(`${envVar.backend_server}/users/view-orders?`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        cache: "no-store",
    });

    const data = await res.json();
    const orders = data?.data || [];

    if (!orders.length) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-5xl mb-4">📦</p>
                <p className="text-lg font-semibold">No orders found</p>
                <p className="text-sm text-gray-400 mt-1">
                    Your placed orders will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] w-[92%] mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-10">
                All Orders
            </h1>

            <div className="space-y-10">
                {orders.map((order: any) => {
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
        </div>
    );
}

export default ViewMedicines;