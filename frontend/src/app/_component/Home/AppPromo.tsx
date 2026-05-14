"use client";

import React from "react";

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

export default function AppPromo() {
  return (
    <section className="relative py-20 px-6 md:px-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto bg-black rounded-[3rem] p-10 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <CrossIcon className="absolute top-10 left-10 w-8 text-white opacity-20" />

        <div className="flex-1 text-center md:text-left relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Healthcare in your pocket. <br />
            <span className="text-white/40 text-3xl md:text-4xl">Download our app.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg">
            Get exclusive offers, track your orders in real-time, and consult with doctors on the go.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.5 12c0-2.4-1.9-4.3-4.3-4.3s-4.3 1.9-4.3 4.3 1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3zm-4.3 2.8c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8-1.3 2.8-2.8 2.8zM22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10zM12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" />
              </svg>
              App Store
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-white/20 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.8.7-1.5 1.5-1.5h15c.8 0 1.5.7 1.5 1.5v17c0 .8-.7 1.5-1.5 1.5h-15c-.8 0-1.5-.7-1.5-1.5zm1.5-.5h15v-16h-15v16zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
              Google Play
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="w-full max-w-[300px] mx-auto relative z-10">
            {/* Simple Phone Mockup */}
            <div className="aspect-[9/19] bg-[#1a1a1a] rounded-[2.5rem] border-[6px] border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
                <div className="p-4 space-y-4">
                    <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                    <div className="aspect-square bg-white/5 rounded-2xl" />
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-white/10 rounded-full" />
                        <div className="h-3 w-4/5 bg-white/10 rounded-full" />
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-black text-xs">
                    Order Now
                </div>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}
