"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// ── Icons ──────────────────────────────────────────────────────────────────
const BrowseIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 14h32" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="9" cy="11" r="1.2" fill="currentColor" />
    <circle cx="14" cy="11" r="1.2" fill="currentColor" />
    <circle cx="19" cy="11" r="1.2" fill="currentColor" />
    <rect x="10" y="19" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="22" y="19" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M6 8h4l3 16h14l3-11H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17" cy="30" r="2" fill="currentColor" />
    <circle cx="27" cy="30" r="2" fill="currentColor" />
    <path d="M20 16v6M17 19h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const DeliveryIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <rect x="4" y="13" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M24 17h6l4 6v4h-10V17z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="10" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="28" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 23h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Steps Data ─────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  {
    number: "01",
    title: "Browse & Discover",
    description:
      "Explore thousands of OTC medicines across categories. Filter by price, manufacturer, or category to find exactly what you need — no prescription required.",
    icon: <BrowseIcon />,
  },
  {
    number: "02",
    title: "Add to Cart & Checkout",
    description:
      "Add items to your cart and proceed to checkout in seconds. Enter your delivery address and confirm with Cash on Delivery — simple and hassle-free.",
    icon: <CartIcon />,
  },
  {
    number: "03",
    title: "Track & Receive",
    description:
      "Track your order status in real time from your dashboard. Our verified sellers dispatch fast, and you get genuine medicines delivered right to your doorstep.",
    icon: <DeliveryIcon />,
  },
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function HowItWorks() {
  const [visible, setVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden py-24 px-6"
    >
      {/* Subtle dot grid on dark bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div
          className={`mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-xs font-black tracking-[0.2em] uppercase text-white/50 mb-4">
              How It Works
            </p>
            <h2
              className="text-4xl md:text-6xl font-black text-white leading-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
            >
              From Browse <br />
              to Doorstep.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white/70 leading-relaxed md:text-right">
            Three simple steps between you and the medicines you need. No complications, no delays.
          </p>
        </div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/20 rounded-2xl overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`relative bg-black p-10 flex flex-col gap-8 group transition-all duration-700 hover:bg-white/5 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120 + 150}ms` }}
            >
              {/* Top row: number + icon */}
              <div className="flex items-start justify-between">
                <span
                  className="text-5xl font-black text-white/25 leading-none select-none"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {step.number}
                </span>
                <div className="text-white/75 group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-white/30" />

              {/* Text */}
              <div className="flex flex-col gap-3">
                <h3
                  className="text-xl font-black text-white leading-snug"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector — hidden on last */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black border border-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white/40 ml-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          className={`mt-14 flex justify-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <Link
            href="/register"
            className="group inline-flex items-center gap-3 bg-white text-black font-bold text-sm px-10 py-4 rounded-full hover:opacity-80 transition-opacity duration-300"
          >
            Start Ordering Now
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}