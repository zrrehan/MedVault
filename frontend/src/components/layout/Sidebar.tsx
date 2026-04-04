// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export type Route = {
  name: string;
  path: string;
};

type SidebarProps = {
  routes: Route[];
};

export default function Sidebar({ routes }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button — fixed to the LEFT */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md rounded-full p-2 text-black"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <FaArrowLeft
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 h-screen bg-white shadow-lg z-40 transition-transform duration-300
          left-0 w-64 md:mt-10 mt-10
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="flex flex-col mt-10">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-3 text-black hover:bg-gray-100 ${
                pathname === route.path ? "font-bold bg-gray-100" : ""
              }`}
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}