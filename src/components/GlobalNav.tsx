'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, X } from 'lucide-react';

const navItems = [
  { name: 'Heart', dropdown: true, trigger: 'hover' },
  { name: 'Notes', dropdown: true, trigger: 'hover' },
  { name: 'Horizon', dropdown: true, trigger: 'hover' },
  { name: 'Circle', dropdown: true, trigger: 'hover' },
  { name: 'Reach', dropdown: true, trigger: 'hover' }
];

const menuContent: any = {
  'Heart': {
    shop: ['Vision', 'Mission', 'Leadership', 'Location', 'History'],
    quickLinks: ['Our Heart', 'Contact Us', 'Association Rules'],
    special: ['Ethics', 'Integrity', 'Spirit']
  },
  'Notes': {
    shop: ['Tech Blog', 'Design Thinking', 'Architecture', 'AI Updates'],
    quickLinks: ['Our Note', 'Newsletter', 'Knowledge Base'],
    special: ['Research', 'Whitepapers']
  },
  'Horizon': {
    shop: ['Podcast', 'Webinars', 'Live Events', 'Feature Stories'],
    quickLinks: ['Stream Now', 'YouTube Channel', 'Archive'],
    special: ['Community Event', 'Promotion']
  },
  'Circle': {
    shop: ['Members', 'Become a Member', 'Partner Network', 'Benefits'],
    quickLinks: ['Our Together', 'Login', 'Join Us'],
    special: ['Fellowship', 'Unity']
  },
  'Reach': {
    shop: ['Get Support', 'Community Forum', 'Service Status'],
    quickLinks: ['Our Reach', 'Contact Us', 'FAQ'],
    special: ['Help Center', 'Feedback']
  },
  'Search': {
    shop: ['Quick Links', 'Events', 'Architecture', 'Membership', 'Insights'],
    quickLinks: [],
    special: []
  },
  'Bag': {
    shop: ['Your Bag is empty.', 'Sign in to see your saved tickets or merchandise.'],
    quickLinks: ['My Profile', 'Orders', 'Account Settings'],
    special: []
  }
};

export default function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeMenu === 'Search' && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [activeMenu]);

  const currentData = menuContent[activeMenu || 'Store'] || menuContent['Store'];

  return (
    <>
      <nav 
        onMouseLeave={() => setActiveMenu(null)}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || activeMenu ? 'bg-white/95' : 'bg-white'} backdrop-blur-xl border-b border-black/5 md:border-black/10`}
      >
        <div className="max-w-[1800px] mx-auto px-4 md:px-24">
          <div className="flex items-center justify-between h-16 text-[18px] text-black/95 font-light tracking-tight">
            
            <Link href="/" onClick={() => setActiveMenu(null)} className="flex-shrink-0 hover:opacity-70 transition-opacity mr-16 cursor-pointer flex items-center space-x-2">
              <svg viewBox="0 0 100 100" className="w-[32px] h-[32px] fill-black">
                {/* APDATIKNAS AI Style Logo */}
                <path d="M50 15 L20 85 L35 85 L50 50 L65 85 L80 85 Z" />
                <circle cx="50" cy="50" r="6" className="fill-blue-600" />
                <path d="M40 70 L60 70" stroke="black" strokeWidth="4" />
                <circle cx="20" cy="85" r="4" />
                <circle cx="80" cy="85" r="4" />
                <circle cx="50" cy="15" r="4" />
              </svg>
              <span className="text-[18px] font-semibold tracking-[-0.03em] hidden sm:inline-block">APDATIKNAS</span>
            </Link>
            
            <div className="hidden md:flex flex-1 justify-between px-16">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href="/shop" 
                  onMouseEnter={() => { if (!activeMenu || (activeMenu !== 'Search' && activeMenu !== 'Bag')) setActiveMenu(item.name) }}
                  className="hover:opacity-60 transition-opacity px-6 py-4 cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-8 pl-16">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'Search' ? null : 'Search'); }} 
                onMouseEnter={() => setActiveMenu(null)}
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                <Search size={23} strokeWidth={1.5} className="text-black" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'Bag' ? null : 'Bag'); }} 
                onMouseEnter={() => setActiveMenu(null)}
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                <ShoppingBag size={23} strokeWidth={1.5} className="text-black" />
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="md:hidden hover:opacity-70 transition-opacity cursor-pointer"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`h-[1.5px] w-full bg-black transition-transform ${isSearchActive ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
                  <span className={`h-[1.5px] w-full bg-black transition-opacity ${isSearchActive ? 'opacity-0' : ''}`} />
                  <span className={`h-[1.5px] w-full bg-black transition-transform ${isSearchActive ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isSearchActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100vh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden fixed inset-0 top-16 bg-white z-[90] px-10 pt-10 overflow-y-auto pb-32"
            >
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.name} className="border-b border-black/10 pb-4">
                    <button 
                      onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.name ? null : item.name)}
                      className="flex justify-between items-center w-full text-[28px] font-semibold tracking-tight"
                    >
                      {item.name}
                      <span className="text-xl font-light">{expandedMobileMenu === item.name ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {expandedMobileMenu === item.name && menuContent[item.name] && (
                        <motion.ul 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 flex flex-col space-y-4 overflow-hidden"
                        >
                          {menuContent[item.name].shop.map((subItem: string) => (
                             <li key={subItem}>
                               <Link 
                                 href={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`} 
                                 className="text-[18px] text-zinc-600 font-medium hover:text-black transition-colors"
                                 onClick={() => setIsSearchActive(false)}
                               >
                                 {subItem}
                               </Link>
                             </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden bg-white"
            >
              {/* Internal transition for content - subtle fade only, no height jump */}
              <motion.div 
                key={activeMenu}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="max-w-[1800px] mx-auto pt-10 pb-20 flex gap-x-24"
                style={{ paddingLeft: '96px' }}
              >
                {/* Visual Spacer: matches exact width of logo area (logo 32px + text + gap) */}
                <div className="w-[210px] flex-shrink-0" />

                {/* Column 1: Primary (Left, Large, Bold) */}
                <div className="flex flex-col min-w-[280px]">
                  <h4 className="text-[12px] text-zinc-500 font-normal mb-6">
                    {activeMenu === 'Search' ? '' : activeMenu === 'Bag' ? 'Bag' : activeMenu}
                  </h4>
                  
                  {activeMenu === 'Search' && (
                     <div className="flex items-center space-x-4 mb-6">
                        <Search size={22} className="text-black/40" />
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Search apdatiknas.org"
                            onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = '/search'; }}
                            className="text-[24px] font-normal text-black/70 bg-transparent outline-none w-full placeholder:text-black/30"
                        />
                     </div>
                  )}

                  <ul className={`${['Bag', 'Search'].includes(activeMenu || '') ? 'text-[12px] font-medium' : 'text-[24px] font-semibold'} space-y-1 tracking-tight text-[#1d1d1f]`}>
                    {activeMenu === 'Search' && <li className="text-[12px] text-zinc-500 font-normal mb-3 mt-4">Quick Links</li>}
                    {currentData.shop.map((item: string) => (
                      <li key={item} className="flex items-center cursor-pointer hover:opacity-60 transition-opacity">
                        {activeMenu === 'Search' && (
                          <svg className="w-3.5 h-3.5 mr-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Column 2: Quick Links */}
                <div className="flex flex-col min-w-[140px]">
                  <h4 className="text-[12px] text-zinc-500 font-normal mb-6">{activeMenu === 'Search' ? '' : activeMenu === 'Bag' ? 'Profile' : 'Quick Links'}</h4>
                  <ul className="text-[12px] font-semibold space-y-2.5 text-[#1d1d1f]">
                    {currentData.quickLinks.map((item: string) => (
                      <li key={item} className="cursor-pointer hover:opacity-60 transition-opacity">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Insights/Special */}
                <div className="flex flex-col">
                  <h4 className="text-[12px] text-zinc-500 font-normal mb-6">
                    {['Heart', 'Notes', 'Horizon', 'Circle'].includes(activeMenu || '') && activeMenu !== 'Search' ? 'Featured' : ''}
                  </h4>
                  <ul className="text-[12px] font-semibold space-y-2.5 text-[#1d1d1f]">
                    {currentData.special && currentData.special.map((item: string) => (
                      <li key={item} className="cursor-pointer hover:opacity-60 transition-opacity">{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMenu(null)}
            className="fixed inset-0 bg-black/20 backdrop-blur-2xl z-[80] pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </>
  );
}
