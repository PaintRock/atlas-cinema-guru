"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const menuItems = [
    { icon: '/icons/folder.png', label: 'Home', href: '/' },
    { icon: '/icons/star2.png', label: 'Favorites', href: '/favorites' },
    { icon: '/icons/clock.png', label: 'Watch Later', href: '/watch-later' },
  ];

  // Calculate total width of sidebar
  const baseWidth = 44;
  const expandableWidth = 158;
  const totalWidth = baseWidth + expandableWidth;

  const handleItemClick = (label) => {
    setActiveItem(label);
  };

  return (
    <div className="flex h-screen">
      {/* container for the entire sidebar */}
      <div className="relative" style={{ width: baseWidth + 'px' }}>
        {/* mouse event container for hover detection */}
        <div 
          className="absolute top-0 left-0 h-full"
          style={{ width: totalWidth + 'px' }}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Visual container for sidebar (holds both sections) */}
          <div className="flex h-full">
            {/* Base sidebar - always visible */}
            <div className="bg-teal-500 h-full" style={{ width: baseWidth + 'px' }}>
              {/* Icons list */}
              <div className="flex flex-col items-center py-2">
                {menuItems.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    onClick={() => handleItemClick(item.label)}
                    className={`flex justify-center items-center my-4 cursor-pointer
                      ${activeItem === item.label ? 'text-white' : 'text-white hover:opacity-80'}
                    `}
                  >
                    <div className="relative w-7 h-7">
                      <Image 
                        src={item.icon} 
                        alt={item.label} 
                        fill
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Expanded view contents */}
            <div 
              className="bg-teal-500 h-full overflow-hidden transition-all duration-300"
              style={{ 
                width: isExpanded ? expandableWidth + 'px' : '0px'
              }}
            > 
              {/* Menu labels */}
              <div className="flex flex-col py-3">
                {menuItems.map((item, index) => (
                   <Link
                     href={item.href}
                     key={index} 
                     onClick={() => handleItemClick(item.label)}
                     className={`
                       flex items-center my-4 cursor-pointer 
                       h-7 ml-2
                       ${activeItem === item.label ? 'font-bold' : 'font-medium'}
                     `}
                   >
                     <span className="text-white">{item.label}</span>
                   </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Activities panel - positioned on top of both sections */}
          {isExpanded && (
            <div 
              className="absolute bg-teal-200 rounded-lg overflow-y-auto"
              style={{
                width: totalWidth - 40 + 'px',  // 20px each side
                left: '10px',
                top: '200px',
                height: 'auto',
                maxHeight: 'calc(100% - 160px)' // make panel end before bottom of sidebar
              }}
            >
              <div className="p-4">
                <h2 className="font-bold text-xl text-[#00003c] mb-4">Latest Activities</h2>
                <div className="text-[#00003c]">
                  {/* This area will be populated with actual activity data */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
