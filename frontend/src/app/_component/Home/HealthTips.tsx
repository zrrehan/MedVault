"use client";

import React from "react";

const tips = [
  {
    title: "10 Tips for a Healthier Heart",
    category: "Wellness",
    date: "May 12, 2026",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Understanding Generic vs Brand Medicines",
    category: "Education",
    date: "May 10, 2026",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "How to Build a Strong Immune System",
    category: "Health",
    date: "May 08, 2026",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  },
];

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function HealthTips() {
  return (
    <section className="relative py-24 px-6 md:px-20 bg-[#fafafa] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Latest Health Insights
            </h2>
            <p className="text-black/60">
              Stay updated with the latest health tips and medical news from our experts.
            </p>
          </div>
          <button className="flex items-center gap-2 font-bold text-black hover:gap-4 transition-all group">
            View All Articles
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-lg">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-black">
                    {tip.category}
                  </span>
                </div>
              </div>
              <p className="text-black/40 text-sm mb-3 font-medium">{tip.date}</p>
              <h3 className="text-xl font-bold text-black group-hover:text-black/70 transition-colors leading-snug">
                {tip.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
