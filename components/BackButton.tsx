"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-gray-500 hover:text-[#FF8237] mb-6 transition-colors font-medium cursor-pointer"
    >
      <ArrowLeft size={20} className="mr-2" /> Back
    </button>
  );
}