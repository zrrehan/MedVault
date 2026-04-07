import Sidebar, { Route } from "@/components/layout/Sidebar"
import { getUserDetails } from "@/utils/getUserDetails";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const userData = await getUserDetails();
    const role = userData?.role;
    let routes = [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Seller", path: "/seller-dashboard" },
            { name: "Admin", path: "/admin-dashboard" },
        ];

    if(role == "ADMIN") {
        routes = [
            { name: "Manage Users", path: "/admin-dashboard" },
            { name: "View Orders", path: "/admin-dashboard/view-orders" },
            { name: "View Medicines", path: "/admin-dashboard/view-medicines" },
        ];
    };
    if(role == "SELLER") {
          routes = [
            { name: "Add Medicine", path: "/seller-dashboard/add-medicine" },
            { name: "Edit Medicine", path: "/seller-dashboard/edit-medicine" },
            
        ];
    }
    return <section>
            <Sidebar routes={routes}></Sidebar>
            <main className="md:ml-64 flex-1 p-6">
                {children}
            </main>
        </section>
}