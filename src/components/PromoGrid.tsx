import React from 'react';
import Link from 'next/link';

interface PromoProps {
  title?: string;
  subtitle?: string;
  imageUrl: string;
  logoUrl?: string;
  darkTheme?: boolean;
  cta1?: { text: string; href: string };
  cta2?: { text: string; href: string };
  imageAlt: string;
  topAlignText?: boolean;
  showAppleLogo?: boolean;
}

export function PromoCard({
  title,
  subtitle,
  imageUrl,
  logoUrl,
  darkTheme = false,
  cta1 = { text: 'Learn more', href: '#' },
  cta2 = { text: 'Buy', href: '#' },
  imageAlt,
  topAlignText = true,
  showAppleLogo = false
}: PromoProps) {
  const textColorClass = darkTheme ? 'text-white' : 'text-slate-900';
  
  return (
    <div className="relative overflow-hidden w-full h-[600px] flex flex-col items-center bg-white group shadow-sm border border-slate-100/50">
      <div className={`relative z-10 flex flex-col items-center text-center px-4 w-full h-full ${topAlignText ? 'pt-12' : 'justify-end pb-14'} ${textColorClass}`}>
        {logoUrl ? (
          <img src={logoUrl} alt={title || "Logo"} className="h-[34px] md:h-[42px] mb-3" />
        ) : (
          title && (
            <h3 className="text-[32px] md:text-[48px] leading-[1.05] font-semibold tracking-[-0.012em] flex items-center justify-center">
              {showAppleLogo && (
                <svg viewBox="0 0 17 17" className={`w-[26px] h-[32px] md:w-[32px] md:h-[40px] mr-2 ${darkTheme ? 'fill-white' : 'fill-black'}`}>
                  <path d="M8.8,3.7C9.3,3.1,9.6,2.2,9.6,1.4c0-0.1,0-0.2,0-0.2C8.7,1.3,7.9,1.7,7.3,2.2C6.9,2.7,6.5,3.6,6.6,4.4c0,0.1,0,0.2,0,0.2 C7.5,4.6,8.3,4.2,8.8,3.7z M12.5,7.5c-0.1-1.6,1.3-2.4,1.4-2.4c-0.8-1.1-2-1.2-2.4-1.3C10.5,3.7,9.6,4.3,9.1,4.3C8.6,4.3,7.9,3.8,7,3.8 c-1.2,0-2.3,0.7-2.9,1.8C2.8,7.9,3.7,11.5,4.8,13.1c0.5,0.8,1.2,1.7,2.1,1.7c0.8-0.1,1.2-0.6,2.2-0.6c1,0,1.3,0.6,2.2,0.6 c0.9,0,1.5-0.9,2-1.7c0.6-0.9,0.9-1.8,0.9-1.8C14.2,11.2,12.6,9.5,12.5,7.5z"/>
                </svg>
              )}
              {title.replace('Apple ', '')}
            </h3>
          )
        )}
        
        {subtitle && (
          <p className="text-[17px] md:text-[21px] mt-2 tracking-normal font-normal max-w-sm leading-tight px-6 opacity-95">
            {subtitle}
          </p>
        )}
        
        {cta1.text && (
          <div className="mt-6 flex items-center space-x-3 text-[17px] relative z-30">
            <Link href="/shop" className="bg-[#0071e3] text-white px-5 py-2 rounded-full font-normal hover:bg-[#0077ed] transition-colors cursor-pointer">
              {cta1.text}
            </Link>
            {cta2?.text && (
              <Link href="/shop" className="border border-[#0071e3] text-[#0071e3] px-5 py-2 rounded-full font-normal hover:bg-[#0071e3] hover:text-white transition-all duration-300 cursor-pointer">
                {cta2.text}
              </Link>
            )}
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 w-full h-full object-cover z-0 flex justify-center items-end">
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Overlay link removed to allow button interaction */}
    </div>
  );
}

export default function PromoGrid({ promos }: { promos: PromoProps[] }) {
  const gridCols = promos.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  
  return (
    <section className={`grid grid-cols-1 ${gridCols} gap-4 px-4 pb-4`}>
      {promos.map((promo, idx) => (
        <PromoCard key={idx} {...promo} />
      ))}
    </section>
  );
}
