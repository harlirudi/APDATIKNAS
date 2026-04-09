'use client';

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollConnectorProps {
  height?: string | number;
}

export default function ScrollConnector({ height = '400px' }: ScrollConnectorProps) {
  const { scrollYProgress } = useScroll();
  
  // Create a spring-based scale for the line to make it feel organic
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex justify-center w-full" style={{ height }}>
      <div className="relative h-full w-[1px] bg-slate-200">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-slate-500 origin-top"
          style={{ height: '100%', scaleY }}
        />
        
        {/* Integrated Nodes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-400 border border-white" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-400 border border-white" />
      </div>
    </div>
  );
}
