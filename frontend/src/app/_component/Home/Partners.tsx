"use client";

import React from "react";

const partners = [
  "PharmaCo", "HealthLine", "BioTrust", "MediCare", "LifeSource", "GlobalMed"
];

export default function Partners() {
  return (
    <section className="py-16 bg-white border-y border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-black/40 text-sm font-semibold uppercase tracking-[0.2em] mb-12">
          Trusted by Industry Leaders
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner, idx) => (
            <div key={idx} className="text-2xl font-black text-black tracking-tighter hover:scale-110 transition-transform cursor-default">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
