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

export default function TvCarousel({ showTitle = true }: { showTitle?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Pindahkan logika scroll ke dalam useCallback agar clean dan tidak memicu re-render tidak perlu
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const itemWidth = scrollContainer.scrollWidth / items.length;

    // Deteksi apakah ini lompatan 'rewind' dari gambar terakhir kembali ke gambar pertama
    const isResetting = activeIndex === items.length - 1 && index === 0;

    scrollContainer.scrollTo({
      left: index * itemWidth,
      // 2. KUNCI PERBAIKAN: Gunakan 'auto' (instan) jika kembali ke awal, 'smooth' jika maju normal
      behavior: isResetting ? 'auto' : 'smooth'
    });

    setActiveIndex(index);
  }, [activeIndex]);

  // Auto-play logic
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      scrollToIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, isHovered, scrollToIndex]);

  // Tangani update titik (dot) saat pengguna menggeser (swipe/scroll) manual
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollContainer = scrollRef.current;
    const itemWidth = scrollContainer.scrollWidth / items.length;

    // Gunakan Math.max dan Math.min untuk mencegah error index saat efek 'bounce' di perangkat Apple
    const newIndex = Math.min(
      items.length - 1,
      Math.max(0, Math.round(scrollContainer.scrollLeft / itemWidth))
    );

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

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
          className="flex space-x-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-[20vw]"
        >
          {items.map((item, idx) => (
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

      {/* Slider Control Dots */}
      <div className="flex justify-center items-center space-x-3 pt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`transition-all duration-500 rounded-full ${activeIndex === idx ? 'w-10 h-2 bg-slate-800' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}