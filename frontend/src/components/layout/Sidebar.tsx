// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Route = {
    name: string, 
    path: string
} 

type SidebarProps= {
    routes: Route[]
}

export default function Sidebar({routes}: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="w-64 mt-10 h-screen bg-white shadow-lg fixed left-0 top-0">
      <nav className="flex flex-col mt-10">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`px-6 py-3 text-black hover:bg-gray-100 ${
              pathname === route.path ? "font-bold bg-gray-100" : ""
            }`}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}