"use client";
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Pagenav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1;
  
  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage <= 1) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(currentPage - 1));
    router.push(`?${params.toString()}`);
  };
  
  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage >= 5) return; // Default max pages of 5, can be adjusted
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(currentPage + 1));
    router.push(`?${params.toString()}`);
  };

  return (

    <div className="flex">
      <div className="border-2 border-[#00003c] bg-teal-500 rounded-full overflow-hidden flex w-72 h-20">
        <button 
          className="w-full text-white font-medium hover:bg-teal-600"
          onClick={goToPreviousPage}
        >
          Previous
        </button>
        <div className="w-px bg-teal-600"></div>
        <button 
          className="w-full text-white font-large hover:bg-teal-600"
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
