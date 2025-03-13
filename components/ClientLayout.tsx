/* use client and use server were causing a conflict and a mess in the layout page so this seemed like a solution.
  however there are problems like the secure login page that started so.  I think I should keep this but 
  I need to fix the lost security*? */

"use client";
import React, { Suspense, useState } from 'react';
import Sidebar from "@/components/Sidenav";
import Header from "@/components/Header";
import Pagenav from "@/components/Pagenav"


type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  return (
    /* container for the page including images */
    <div className="flex flex-col h-screen">
      {/* Header at the top */}
      <Header />
      
      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar onExpand={setSidebarExpanded} />
        <div className="flex-1 flex flex-col overflow-hidden">    
      {/* main content - transitions smoothly with sidebar */}
        <main className="flex-1 overflow-y-auto p-4 transition-all duration-300">
          <Suspense>
          {children}
          </Suspense>
        </main>
        {/* forward page/ back page control -- following movie bottom */}
        <div className="p-1 border-t border-gray-700 bg-[#00003c] flex justify-center">
             <Suspense> <Pagenav /> </Suspense>
          </div>
        </div>
      </div>     
    </div>
  );
}
