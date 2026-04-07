"use client";

import Link from "next/link";

function PaymentFailed() {
  return (
    <div className="relative min-h-svh flex items-center justify-center px-6 bg-white overflow-hidden">

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center max-w-md">

        {/* Status */}
        <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-4">
          Payment Status
        </p>

        {/* Heading */}
        <h1
          className="text-4xl md:text-5xl font-black text-black leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Payment Failed.
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm text-black/50 leading-relaxed">
          Something went wrong while processing your payment. Please try again or use a different method.
        </p>

        {/* Divider */}
        <div className="w-12 h-[2px] bg-black/10 mx-auto my-6" />

        {/* CTA */}
        <div className="flex justify-center gap-3">
          <Link
            href="/cart"
            className="px-6 py-3 rounded-full bg-black text-white text-sm font-bold hover:opacity-80 transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-black/10 text-black/70 text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;