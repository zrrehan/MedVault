"use client";

import React from "react";

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

export default function Newsletter() {
  return (
    <section className="relative py-24 px-6 md:px-20 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      
      <PillIcon className="absolute top-20 left-[10%] w-24 text-black opacity-5 rotate-12" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">
          Stay healthy and informed.
        </h2>
        <p className="text-black/60 text-lg mb-12 max-w-2xl mx-auto">
          Subscribe to our newsletter for health tips, exclusive offers, and the latest updates from MedVault.
        </p>

        <form 
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-8 py-5 rounded-full bg-black/5 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 text-black placeholder:text-black/30"
            required
          />
          <button
            type="submit"
            className="px-10 py-5 rounded-full bg-black text-white font-bold hover:bg-black/80 transition-all duration-300 shadow-xl active:scale-95"
          >
            Subscribe
          </button>
        </form>
        
        <p className="mt-6 text-black/30 text-sm">
          No spam, we promise. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
