'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const items = [
  { src: "/images/user_pin1.jpg", title: "Architecture", cat: "Design" },
  { src: "/images/user_pin3.jpg", title: "Future Tech", cat: "Innovation" },
  { src: "/images/user_pin2.jpg", title: "Security AI", cat: "Cyber" },
  { src: "/images/user_pin10.jpg", title: "Data Flow", cat: "Analytics" },
  { src: "/images/user_pin11.jpg", title: "Smart City", cat: "Urban" }
];

// TRIK LOOP ALAMI: Gandakan slide pertama dan letakkan di urutan paling akhir
const extendedItems = [...items, items[0]];

export default function TvCarousel({ showTitle = true }: { showTitle?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isResetting = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current || isResetting.current) return;

    const scrollContainer = scrollRef.current;
    const itemWidth = scrollContainer.scrollWidth / extendedItems.length;

    // Matikan efek tarikan CSS Snap sementara agar JS Smooth Scroll tidak patah-patah
    scrollContainer.style.scrollSnapType = 'none';

    scrollContainer.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });

    setActiveIndex(index);

    // Nyalakan kembali efek tarikan CSS Snap setelah animasi selesai (600ms)
    setTimeout(() => {
      if (scrollContainer) scrollContainer.style.scrollSnapType = 'x mandatory';
    }, 600);

    // ILUSI INFINITE LOOP: Jika slide bergerak ke slide kloningan (index ke-5)
    if (index === extendedItems.length - 1) {
      isResetting.current = true;
      // Biarkan animasi mulus berjalan dulu, lalu reset posisi ke index 0 secara rahasia
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
          setActiveIndex(0);
          isResetting.current = false;
        }
      }, 600); // Waktu standar browser menyelesaikan 'smooth' scroll
    }
  }, []);

  // Logika Auto-play (Kecepatan tetap 3 detik)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      // Maju satu langkah, asalkan tidak sedang dalam proses reset rahasia
      if (!isResetting.current) {
        scrollToIndex(activeIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, isHovered, scrollToIndex]);

  // Tangani gulir manual (swipe) oleh pengguna
  const handleScroll = () => {
    if (!scrollRef.current || isResetting.current) return;
    const scrollContainer = scrollRef.current;
    const itemWidth = scrollContainer.scrollWidth / extendedItems.length;

    const newIndex = Math.round(scrollContainer.scrollLeft / itemWidth);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Kalkulasi agar titik (dot) navigasi tetap berjumlah 5 dan menyala dengan benar
  const realDotIndex = activeIndex === extendedItems.length - 1 ? 0 : activeIndex;

  return (
    <section className="pt-20 md:pt-40 pb-32 bg-white overflow-hidden space-y-12 md:space-y-24">
      {showTitle && (
        <div className="text-center px-4 max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-[62px] font-semibold tracking-tight leading-tight">Endless Entertainment.</h2>
          <p className="text-xl md:text-2xl text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
            Experience the extraordinary in every frame.
          </p>
        </div>
      )}

      {/* Snap Carousel Container */}
      <div
        className="w-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          // Kita merender 'extendedItems' yang berisi 6 item (5 asli + 1 kloningan)
          className="flex space-x-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-[20vw]"
        >
          {extendedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[85vw] md:w-[60vw] h-[220px] md:h-[574px] snap-center rounded-[32px] overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center space-x-4 md:space-x-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                <Link href="/watch" className="bg-white text-black px-6 md:px-10 py-2 md:py-3.5 rounded-full font-medium text-[15px] md:text-[19px] hover:bg-white/90 transition-all shadow-xl cursor-pointer">
                  Stream now
                </Link>
                <div className="text-white flex flex-col">
                  <span className="text-[15px] md:text-lg font-semibold tracking-wide">Featured Creation</span>
                  <span className="text-[10px] md:text-sm opacity-80 uppercase tracking-[0.2em]">{item.cat} <span className="mx-1">•</span> {item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Control Dots (Hanya me-render 5 dot asli) */}
      <div className="flex justify-center items-center space-x-3 pt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`transition-all duration-500 rounded-full ${realDotIndex === idx ? 'w-10 h-2 bg-slate-800' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}