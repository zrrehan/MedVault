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
    <div suppressHydrationWarning className="w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side - Logo and links */}
          <div className="flex items-center space-x-8">
            <div className="pl-11 md:pl-0 text-2xl font-bold text-black">
              <Link href="/">MediVault</Link>
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="text-black font-medium"
                  >
                    {link.name}
                  </Link>
                  {/* Underline animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="md:flex space-x-4 flex items-center">
            <Link href = "/cart">
              <div className="p-1.5 flex items-center justify-center hover:text-white rounded-full border border-black hover:bg-black transition-colors duration-200 cursor-pointer">
                <LuShoppingCart size={20} className="transition-colors duration-200" />
              </div>
            </Link>
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-1 rounded-md border border-black text-black font-medium transition-all duration-200 hover:bg-black hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1 rounded-md bg-black text-white font-medium transition-all duration-200 hover:bg-gray-800"
              >
                Signup
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div
              className="text-black hover:text-gray-700 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="block text-black font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2 flex flex-col space-y-2">
              <Link
                href="/login"
                className="block px-4 py-1 rounded-md border border-black text-black font-medium transition-all duration-200 hover:bg-black hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-1 rounded-md bg-black text-white font-medium transition-all duration-200 hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;