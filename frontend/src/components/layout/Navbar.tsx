"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuShoppingCart } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Medicines", href: "/medicines" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Orders", href: "/my-orders" },
  ];

  return (
    <div
      suppressHydrationWarning
      className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/10"
    >
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black text-black tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            MediVault
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-black/70 hover:text-black transition-colors duration-300"
                >
                  {link.name}
                </Link>

                {/* elegant underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />

                {/* subtle number index (design touch) */}
                <span className="absolute -top-3 left-0 text-[10px] text-black/20 font-bold opacity-0 group-hover:opacity-100 transition">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">

            {/* Cart */}
            <Link href="/cart">
              <div className="p-2 rounded-full border border-black/10 text-black/70 hover:text-white hover:bg-black transition-all duration-300">
                <LuShoppingCart size={18} />
              </div>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-black/10 mx-2" />

            {/* Auth */}
            <Link
              href="/login"
              className="text-sm font-semibold text-black/70 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="text-sm font-bold bg-black text-white px-5 py-2 rounded-full hover:opacity-80 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-black/10 text-black/70"
            >
              {isOpen ? (
                <HiOutlineX className="w-5 h-5" />
              ) : (
                <HiOutlineMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 bg-white/95 backdrop-blur-xl border-t border-black/10">

          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-black/80 font-semibold text-sm border-b border-black/5 pb-2"
            >
              {link.name}
              <span className="text-xs text-black/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-center text-sm font-semibold text-black/70 border border-black/10 py-2 rounded-full"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="text-center text-sm font-bold bg-black text-white py-2 rounded-full"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;