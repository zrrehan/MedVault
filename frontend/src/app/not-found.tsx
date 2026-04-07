"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-svh flex items-center justify-center px-6 bg-white overflow-hidden">

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center max-w-md">

        {/* Code */}
        <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-4">
          404 Error
        </p>

        {/* Heading */}
        <h1
          className="text-5xl md:text-6xl font-black text-black leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Lost in Space.
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm text-black/50 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Divider */}
        <div className="w-12 h-[2px] bg-black/10 mx-auto my-6" />

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-black text-white text-sm font-bold hover:opacity-80 transition"
          >
            Back Home
          </Link>
          <Link
            href="/medicines"
            className="px-6 py-3 rounded-full border border-black/10 text-black/70 text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            Browse Medicines
          </Link>
        </div>
      </div>
    </div>
  );
}