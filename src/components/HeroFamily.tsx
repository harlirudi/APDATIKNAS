import React from 'react';
import Link from 'next/link';

interface MultiHeroProps {
  title: string;
  subtitle: string;
  items: {
    imageUrl: string;
    imageAlt: string;
    label: string;
  }[];
  features?: string[];
  whiteBackground?: boolean;
}

export default function HeroFamily({
  title,
  subtitle,
  items,
  features,
  whiteBackground = true
}: MultiHeroProps) {
  return (
    <section className={`relative w-full overflow-hidden flex flex-col items-center pt-14 md:pt-16 mt-2 ${whiteBackground ? 'bg-white' : ''}`}>
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-[32px] md:text-[56px] leading-[1.07] font-semibold tracking-tight">{title}</h2>
        <h3 className="text-xl md:text-[28px] mt-1 md:mt-1.5 leading-tight font-normal">{subtitle}</h3>
        
        {features && (
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-left max-w-2xl mx-auto">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-[14px] md:text-[17px] opacity-80">
                <span className="mr-2 text-[#0071e3]">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-center space-x-4 text-[17px]">
          <Link href="/shop" className="bg-[#0071e3] text-white px-7 py-2.5 rounded-full font-normal hover:bg-[#0077ed] transition-colors">
            Explore the line
          </Link>
        </div>
      </div>

      <div className="mt-12 w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <div className="w-full h-[300px] md:h-[450px] relative overflow-hidden flex items-center justify-center">
              <img 
                src={item.imageUrl} 
                alt={item.imageAlt} 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-[17px] font-medium text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
