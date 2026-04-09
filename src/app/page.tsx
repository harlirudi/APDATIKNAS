import Link from "next/link";
import GlobalNav from "@/components/GlobalNav";
import HeroSection from "@/components/HeroSection";
import PromoGrid from "@/components/PromoGrid";
import TvCarousel from "@/components/TvCarousel";
import GlobalFooter from "@/components/GlobalFooter";
import ScrollConnector from "@/components/ScrollConnector";

export default function Home() {
  const promos = [
    {
      imageUrl: '/images/user_pin12.jpg',
      imageAlt: 'Visual Element 1',
      darkTheme: true,
      topAlignText: false,
      cta1: { text: '', href: '#' }
    },
    {
      imageUrl: '/images/user_pin13.jpg',
      imageAlt: 'Visual Element 2',
      darkTheme: true,
      topAlignText: false,
      cta1: { text: '', href: '#' }
    },
    {
      imageUrl: '/images/user_pin14.jpg',
      imageAlt: 'Visual Element 3',
      darkTheme: true,
      topAlignText: false,
      cta1: { text: '', href: '#' }
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <GlobalNav />

      {/* Spacer for Fixed Nav */}
      <div className="h-16 w-full" />

      {/* 1. Connector from Nav to Title 1 - Long Entry Scroll for Mystery */}
      <div className="pt-12 pb-12">
        <ScrollConnector height="1000px" />
      </div>

      {/* Section 1: Start with Heart - Very close to Wall-E */}
      <section className="pb-4 text-center">
        <h1 className="text-[42px] md:text-[72px] font-light tracking-[0.08em] text-slate-900 animate-fade-in">
          Start with Heart.
        </h1>
      </section>

      {/* Hero: Wall-E & Eve */}
      <HeroSection
        imageUrl="/images/user_pin5.jpg"
        imageAlt="Robot Spider Hero"
        whiteBackground={true}
        rotateImage={true}
        superTall={true}
      />

      {/* Action Button: Our Heart - Closer to Wall-E on Mobile */}
      <div className="flex flex-col items-center pt-2 -mt-20 md:-mt-8 relative z-10">
        <Link href="/heart" className="group">
          <div className="bg-black text-white px-12 py-4 rounded-full text-[19px] font-medium tracking-tight shadow-xl hover:scale-[1.05] active:scale-95 transition-all duration-300 cursor-pointer">
            Our Heart
          </div>
        </Link>
      </div>

      {/* 2. Connector from Wall-E to Title 2 - Long bridge to fill the gap */}
      <div className="pt-24 pb-12">
        <ScrollConnector height="1000px" />
      </div>

      {/* Section 2: Crafting Tomorrow's Legacy */}
      <section className="pb-20 text-center">
        <h2 className="text-[32px] md:text-[52px] font-light tracking-[0.04em] text-slate-800">
          Crafting Tomorrow's Legacy.
        </h2>
      </section>

      <PromoGrid promos={promos} />

      {/* Action Button: Our Note */}
      <div className="flex flex-col items-center pt-14">
        <Link href="/notes" className="group">
          <div className="bg-black text-white px-12 py-4 rounded-full text-[19px] font-medium tracking-tight shadow-xl hover:scale-[1.05] active:scale-95 transition-all duration-300 cursor-pointer">
            Our Note
          </div>
        </Link>
      </div>

      {/* 3. Connector from 3 Kids to Title 3 */}
      <div className="pt-32 pb-16">
        <ScrollConnector height="300px" />
      </div>

      {/* Section 3: The Horizon of Possible */}
      <section className="pb-16 text-center">
        <h2 className="text-[32px] md:text-[56px] font-extralight tracking-[0.05em] text-slate-900">
          The Horizon of Possible.
        </h2>
      </section>

      {/* Entertainment Carousel */}
      <TvCarousel showTitle={false} />

      <GlobalFooter />
    </main>
  );
}
