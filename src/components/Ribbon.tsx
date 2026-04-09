import React from 'react';
import Link from 'next/link';

export default function Ribbon() {
  return (
    <div className="bg-[#f5f5f7] py-3 text-center text-sm text-[#1d1d1f] mt-11">
      <p className="px-4">
        Shop online and get Specialist help, free delivery, and more. 
        <Link href="#" className="text-[#0066cc] hover:underline ml-1">Shop now &gt;</Link>
      </p>
    </div>
  );
}
