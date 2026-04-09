"use client";

import { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import { AuthContext } from "@/utils/AuthContext";
import { getUserDetails } from "@/utils/getUserDetails";
import { useRouter } from "next/navigation";
import { logOutUser } from "../_action/logOutUser";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function dedicateUser() {
      const userData = await getUserDetails();
      setUser(userData);
    }
    dedicateUser();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutsideClick(e:any) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    // Clear your auth token/cookie here
    setUser(null);
    setDropdownOpen(false);
    await logOutUser();
    router.push("/") 
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Medicines", href: "/medicines" },
    { name: "My Orders", href: "/my-orders" },
  ];

  if(user && user.role !== "CUSTOMER") {
    navLinks.push(
      { name: "Dashboard", href: "/dashboard" }
    )
  }

  return (
    <div
      suppressHydrationWarning
      className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/10"
    >
      {/* Subtle grid texture */}
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
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                <span className="absolute -top-3 left-0 text-[10px] text-black/20 font-bold opacity-0 group-hover:opacity-100 transition">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">

            {/* Cart */}
            <Link href="/cart">
              <div className="p-2 rounded-full border border-black/10 text-black/70 hover:text-white hover:bg-black transition-all duration-300">
                <LuShoppingCart size={18} />
              </div>
            </Link>

            <div className="w-px h-6 bg-black/10 mx-2" />

            {/* Auth: Show avatar if user exists, else Login/Register */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="focus:outline-none"
                >
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-black/15 hover:border-black transition-all duration-300 hover:scale-105"
                  />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden z-50 animate-fadeIn">

                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-black/5">
                      <p className="text-sm font-bold text-black truncate">{user.name}</p>
                      <p className="text-xs text-black/50 truncate">{user.email}</p>
                      {user.role && (
                        <span className="inline-block mt-1.5 text-[9px] font-extrabold tracking-widest uppercase bg-black text-white px-2 py-0.5 rounded-full">
                          {user.role}
                        </span>
                      )}
                    </div>

                    {/* My Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-black/75 hover:bg-black/5 transition-colors"
                    >
                      <HiOutlineUser size={16} />
                      My Profile
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-black/5 mx-3" />

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <HiOutlineLogout size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2 border-b border-black/5">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-black/15"
                  />
                  <div>
                    <p className="text-sm font-bold text-black">{user.name}</p>
                    <p className="text-xs text-black/50">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-black/70 border border-black/10 py-2 px-4 rounded-full"
                >
                  <HiOutlineUser size={15} /> My Profile
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-red-600 border border-red-200 py-2 rounded-full"
                >
                  <HiOutlineLogout size={15} /> Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;