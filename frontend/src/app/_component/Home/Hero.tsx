"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

// ── Decorative SVGs ────────────────────────────────────────────────────────
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

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── Animated Counter ───────────────────────────────────────────────────────
const Counter = ({ target, suffix = "", duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// ── Static Data ────────────────────────────────────────────────────────────
const STATS: StatItem[] = [
  { label: "Medicines Listed", value: 5000, suffix: "+" },
  { label: "Verified Sellers", value: 300, suffix: "+" },
  { label: "Orders Delivered", value: 50000, suffix: "+" },
  { label: "Happy Customers", value: 20000, suffix: "+" },
];

// ── Main Hero Component ────────────────────────────────────────────────────
export default function Hero() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex flex-col">

      {/* Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Decorative Icons */}
      <PillIcon className="absolute top-24 right-[12%] w-20 text-black opacity-10 rotate-[-20deg]" />
      <CrossIcon className="absolute bottom-32 right-[8%] w-10 text-black opacity-10" />
      <PillIcon className="absolute bottom-48 left-[6%] w-14 text-black opacity-10 rotate-[15deg]" />
      <CrossIcon className="absolute top-36 left-[14%] w-7 text-black opacity-10" />
      <PillIcon className="absolute top-1/2 left-[3%] w-10 text-black opacity-[0.06] rotate-[40deg]" />
      <CrossIcon className="absolute top-1/3 right-[18%] w-5 text-black opacity-[0.08]" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-24">

        {/* Trust Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-black/5 border border-black/10 text-black text-xs font-semibold px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          Bangladesh&apos;s Trusted OTC Medicine Platform
        </div>

        {/* Headline */}
        <h1
          className={`max-w-4xl mx-auto text-5xl md:text-7xl font-black text-black leading-[1.05] transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.04em", transitionDelay: "200ms" }}
        >
          Your Health,{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Delivered</span>
            <span
              className="absolute left-0 w-full bg-black -z-0 rounded"
              style={{ bottom: "6px", height: "6px", opacity: 0.12 }}
            />
          </span>
          <br />
          Right to Your Door.
        </h1>

        {/* Subheading */}
        <p
          className={`mt-6 max-w-xl mx-auto text-lg text-black/50 leading-relaxed transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          Browse thousands of over-the-counter medicines from verified pharmacies.
          Fast delivery, genuine products, no prescription hassle.
        </p>

        {/* CTA Buttons */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center gap-3 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          <Link
            href="/shop"
            className="group flex items-center gap-2 bg-black text-white font-bold text-sm px-8 py-4 rounded-full hover:opacity-75 transition-opacity duration-300"
          >
            Browse All Medicines
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/register?role=seller"
            className="flex items-center gap-2 border-2 border-black text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            Sell on MediVault
          </Link>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div
        className={`relative z-10 border-t border-black/10 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
          {STATS.map(({ label, value, suffix }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-4">
              <p
                className="text-2xl md:text-3xl font-black text-black"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-xs text-black/40 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}