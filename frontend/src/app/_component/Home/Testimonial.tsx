"use client";

import Image from "next/image";

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

// ── Testimonial Data ───────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Imran Khan",
    role: "Verified Buyer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQT08_1dF0iNLYfRnL2lbqnlXg5QKKofxDew&s",
    message: "MedVault made it so easy to order my medicines. Fast delivery and excellent service!",
  },
  {
    name: "Sarah Hossain",
    role: "Health Enthusiast",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW2MAFrFnfa_bT1jSttLbmvfotJcqQyCCGg&s",
    message: "I love the simplicity of this app. The How It Works section is very helpful!",
  },
  {
    name: "Nadim Rahman",
    role: "Regular Customer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAY6HGHV9y5rGsLC77X-A8GR8YZYK1lMhAA&s",
    message: "Highly recommend MedVault. Easy to navigate and very reliable.",
  },
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function Testimonials() {
  return (
    <section className="relative py-20 px-6 md:px-20 bg-white overflow-hidden">

      {/* Grid Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Decorative Icons */}
      <PillIcon className="absolute top-16 right-[10%] w-20 text-black opacity-10 rotate-[-25deg]" />
      <CrossIcon className="absolute bottom-32 right-[12%] w-10 text-black opacity-10" />
      <PillIcon className="absolute bottom-40 left-[8%] w-16 text-black opacity-10 rotate-[20deg]" />
      <CrossIcon className="absolute top-32 left-[14%] w-7 text-black opacity-10" />

      {/* Section Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What Our Users Say
        </h2>
        <p className="text-black/60 mb-12">
          Trusted by thousands of happy customers.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center gap-4 hover:scale-105 transition"
            >
              <img
                src={t.image}
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <p className="text-black/80 text-sm md:text-base text-center">
                "{t.message}"
              </p>
              <h4 className="font-semibold mt-2">{t.name}</h4>
              <p className="text-xs text-black/50">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}