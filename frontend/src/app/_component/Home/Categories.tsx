"use client";

import React from "react";

const categories = [
  { name: "Prescription", icon: "💊", color: "bg-blue-50" },
  { name: "OTC Medicines", icon: "🩹", color: "bg-green-50" },
  { name: "Personal Care", icon: "🧴", color: "bg-purple-50" },
  { name: "Baby Care", icon: "🍼", color: "bg-pink-50" },
  { name: "Nutrition", icon: "🍎", color: "bg-orange-50" },
  { name: "Wellness", icon: "🧘", color: "bg-teal-50" },
];

const CrossIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 2H15V9H22V15H15V22H9V15H2V9H9V2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Categories() {
  return (
    <section className="relative py-20 px-6 md:px-20 bg-white overflow-hidden">
      {/* Grid Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <CrossIcon className="absolute top-10 right-[5%] w-12 text-black opacity-5" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Shop by Category
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Find the right medicines and healthcare products by browsing our curated categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.color} rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-black/5 group`}
            >
              <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {cat.icon}
              </span>
              <h3 className="font-semibold text-black/80 text-sm md:text-base">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
