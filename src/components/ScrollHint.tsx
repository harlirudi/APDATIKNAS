import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollHint() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 opacity-30 group cursor-default">
      <div className="flex flex-col items-center space-y-1.5">
        <div className="w-[1.5px] h-3 bg-slate-900 rounded-full animate-pulse" />
        <div className="w-[1.5px] h-6 bg-slate-900 rounded-full opacity-60" />
        <div className="w-[1.5px] h-10 bg-slate-900 rounded-full opacity-30" />
      </div>
      <ChevronDown size={14} strokeWidth={2.5} className="text-slate-900 animate-bounce" />
    </div>
  );
}
