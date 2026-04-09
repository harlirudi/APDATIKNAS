'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const footerLinks = [
  {
    title: "Heart",
    links: ["Vision", "Mission", "Leadership", "Structure", "Location", "History"]
  },
  {
    title: "Notes",
    links: ["Tech Blog", "Design Thinking", "Architecture", "AI Updates", "Research"]
  },
  {
    title: "Horizon",
    links: ["Podcast", "Webinars", "Live Events", "Feature Stories", "YouTube Archive"]
  },
  {
    title: "Circle",
    links: ["Member Benefits", "Renew Membership", "Partner Network", "Fellowship"]
  },
  {
    title: "Reach",
    links: ["Get Help", "FAQ", "Community Forum", "Contact APDATIKNAS"]
  }
];

export default function GlobalFooter() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] pt-4 pb-8 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <div className="border-b border-[#d2d2d7] pb-4 mb-4 text-[#6e6e73] leading-5">
          <p className="mb-2">1. All content and technology shared are proprietary to the APDATIKNAS ecosystem. Membership eligibility may vary based on professional credentials.</p>
          <p>More ways to connect: <Link href="#" className="underline text-[#0066cc]">Find an APDATIKNAS Chapter</Link> or <Link href="#" className="underline text-[#0066cc]">Contact us</Link> near you.</p>
        </div>

        {/* Desktop Footer Columns */}
        <div className="hidden md:flex flex-wrap">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="w-1/5 mb-6 pr-4">
              <h3 className="font-semibold text-xs mb-2 text-[#1d1d1f]">{section.title}</h3>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[#424245] hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion Footer Menu */}
        <div className="md:hidden">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="border-b border-[#d2d2d7]">
              <button 
                onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                className="w-full py-3.5 font-medium flex justify-between items-center text-[#1d1d1f]"
              >
                {section.title}
                <span className="text-xl font-light">{expandedSection === idx ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {expandedSection === idx && (
                  <motion.ul 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-4 space-y-3 overflow-hidden"
                  >
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="text-[#424245] hover:text-[#1d1d1f] text-[13px] block py-1">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col md:flex-row justify-between items-center text-[#6e6e73] space-y-2 md:space-y-0">
          <p>Copyright © 2026 APDATIKNAS Association. All rights reserved.</p>
          <ul className="flex space-x-3 divide-x divide-[#d2d2d7]">
            <li className="pl-0"><Link href="#" className="hover:text-[#1d1d1f]">Privacy Policy</Link></li>
            <li className="pl-3"><Link href="#" className="hover:text-[#1d1d1f]">Terms of Use</Link></li>
            <li className="pl-3"><Link href="#" className="hover:text-[#1d1d1f]">Sales and Refunds</Link></li>
            <li className="pl-3"><Link href="#" className="hover:text-[#1d1d1f]">Site Map</Link></li>
          </ul>
          <p>Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
