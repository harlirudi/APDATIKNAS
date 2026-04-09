'use client';

import React from 'react';
import Link from 'next/link';

const row1 = [
  "/images/user_pin1.jpg",
  "/images/user_pin3.jpg",
  "/images/user_pin2.jpg",
  "/images/user_pin10.jpg",
  "/images/user_pin11.jpg"
];

export default function TvCarousel({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section className="pt-40 pb-32 bg-white overflow-hidden space-y-24">
      {showTitle && (
        <div className="text-center px-4 max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-[62px] font-semibold tracking-tight leading-tight">Endless Entertainment.</h2>
          <p className="text-xl md:text-2xl text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
            {/* Placeholder for future text as requested */}
            Experience the extraordinary in every frame. 
          </p>
        </div>
      )}

      {/* Single Large Row: Cinematic Sliders */}
      <div className="flex space-x-6 animate-scroll-left hover-pause px-4">
        {row1.concat(row1).concat(row1).map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-[400px] md:w-[1020px] h-[220px] md:h-[574px] rounded-[32px] overflow-hidden relative group cursor-pointer shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img src={src} alt="Show" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 flex items-center space-x-6 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
               <Link href="/watch" className="bg-white text-black px-10 py-3.5 rounded-full font-medium text-[19px] hover:bg-white/90 transition-all shadow-xl cursor-pointer">
                 Stream now
               </Link>
               <div className="text-white flex flex-col">
                 <span className="text-lg font-semibold tracking-wide">Featured Creation</span>
                 <span className="text-sm opacity-80 uppercase tracking-[0.2em]">Architecture <span className="mx-1">•</span> Design</span>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .animate-scroll-left {
          animation: scrollLeft 90s linear infinite;
        }
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @media (hover: hover) and (pointer: fine) {
          .hover-pause:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
