"use client";

import React from "react";

const features = [
  {
    title: "Express Delivery",
    description: "Get your medicines delivered at your doorstep within 24 hours.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Verified Sellers",
    description: "We partner with licensed pharmacies to ensure genuine products.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Our customer support is always available to help you with your orders.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    description: "Multiple payment options with industry-standard encryption.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const PillIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 60 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="58" height="22" rx="11" stroke="currentColor" strokeWidth="2" />
    <line x1="30" y1="1" x2="30" y2="23" stroke="currentColor" strokeWidth="2" />
    <rect x="1" y="1" width="29" height="22" rx="11" fill="currentColor" fillOpacity="0.06" />
  </svg>
);

export default function Features() {
  return (
    <section className="relative py-24 px-6 md:px-20 bg-black text-white overflow-hidden">
      {/* Decorative Icons */}
      <PillIcon className="absolute top-20 right-[10%] w-24 text-white opacity-10 rotate-12" />
      <PillIcon className="absolute bottom-20 left-[5%] w-20 text-white opacity-10 -rotate-12" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why MedVault is your best health partner.
            </h2>
            <p className="text-white/60 text-lg">
              We combine technology with healthcare to provide a seamless experience for all your medical needs.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-1 bg-white/20 rounded-full" />
            <div className="w-24 h-1 bg-white rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
