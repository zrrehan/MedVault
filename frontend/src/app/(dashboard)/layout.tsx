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

    if(role == "ADMIN") {};
    if(role == "SELLER") {
          routes = [
            { name: "Add Medicine", path: "/seller-dashboard/add-medicine" },
            { name: "Edit Medicine", path: "/seller-dashboard/edit-medicine" },
            { name: "All Medicine", path: "/seller-dashboard" },
            { name: "Orders", path: "/admin-dashboard" },
        ];
    }
    return <section>
            <Sidebar routes={routes}></Sidebar>
            <main className="ml-64 flex-1 p-6">
                {children}
            </main>
        </section>
}