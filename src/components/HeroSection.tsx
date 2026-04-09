import React from 'react';
import Link from 'next/link';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  imageUrl: string;
  imageAlt: string;
  darkTheme?: boolean;
  whiteBackground?: boolean;
  rotateImage?: boolean;
  superTall?: boolean;
  cta1?: { text: string; href: string };
  cta2?: { text: string; href: string };
}

export default function HeroSection({
  title,
  subtitle,
  description,
  features,
  imageUrl,
  imageAlt,
  darkTheme = false,
  whiteBackground = false,
  rotateImage = false,
  superTall = false,
  cta1 = { text: 'Learn more', href: '#' },
  cta2 = { text: 'Buy', href: '#' },
}: HeroProps) {
  const textColorClass = darkTheme ? 'text-white' : 'text-slate-900';
  const bgColorClass = whiteBackground ? 'bg-white' : '';
  const heightClass = superTall ? 'h-[1800px] md:h-[2100px]' : 'h-[600px] md:h-[692px]';
  
  return (
    <section className={`relative w-full ${heightClass} overflow-hidden flex flex-col items-center justify-center ${bgColorClass}`}>
      <div className={`relative z-10 flex flex-col items-center text-center px-4 ${textColorClass}`}>
        {title && <h2 className="text-[32px] md:text-[56px] leading-[1.07] font-semibold tracking-tight drop-shadow-sm">{title}</h2>}
        {subtitle && <h3 className="text-xl md:text-[28px] mt-1 md:mt-1.5 leading-tight font-normal drop-shadow-sm">{subtitle}</h3>}
        
        {features && (
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-6 text-left max-w-4xl mx-auto transition-all duration-500">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-[15px] md:text-[18px] opacity-90 backdrop-blur-md bg-white/40 px-5 py-2.5 rounded-full border border-white/20 shadow-sm hover:bg-white/60 transition-colors">
                <span className="mr-3 text-[#0071e3] font-bold">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {description && (
          <p className="mt-4 text-sm md:text-lg text-slate-500 max-w-md md:max-w-xl mx-auto">{description}</p>
        )}
        
        {title && (
          <div className="mt-8 flex items-center space-x-4 text-[17px]">
            <Link href={cta1.href} className="bg-[#0071e3] text-white px-7 py-2.5 rounded-full font-normal hover:bg-[#0077ed] transition-all shadow-lg">
              {cta1.text}
            </Link>
            <Link href={cta2.href} className="border border-[#0071e3] text-[#0071e3] px-7 py-2.5 rounded-full font-normal hover:bg-[#0071e3] hover:text-white transition-all backdrop-blur-md">
              {cta2.text}
            </Link>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 w-full h-full z-0 flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        <div className={`relative flex items-center justify-center ${rotateImage ? 'rotate-[-90deg]' : ''}`} style={{ 
          width: rotateImage ? '100vh' : '100%',
          height: rotateImage ? '100vw' : '100%' 
        }}>
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="w-full h-full object-contain"
          />
          
          {rotateImage && (
            <div className="absolute inset-0 bg-white" style={{ 
              maskImage: 'radial-gradient(circle, transparent 50%, white 100%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 50%, white 100%)',
              opacity: 0.3
            }} />
          )}
        </div>
      </div>
    </section>
  );
}
