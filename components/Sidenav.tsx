"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function Sidebar({ onExpand }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const menuItems = [
    /*Static icons to replace with ludide folder, star, clock imports*/
    { icon: '/icons/folder.png', label: 'Home', href: '/' },
    { icon: '/icons/star2.png', label: 'Favorites', href: '/ui/favorites' },
    { icon: '/icons/clock.png', label: 'Watch Later', href: '/ui/watchlater' },
  ];

  // Calculate total width of sidebar
  const baseWidth = 44;
  const expandableWidth = 158;
  const totalWidth = baseWidth + expandableWidth;

  // Notify parent component of expansion state changes
  useEffect(() => {
    if (onExpand) {
      onExpand(isExpanded);
    }
  }, [isExpanded, onExpand]);

  const handleItemClick = (label) => {
    setActiveItem(label);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div 
      className={`h-full transition-width duration-300 flex-shrink-0`}
      style={{ width: isExpanded ? totalWidth + 'px' : baseWidth + 'px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-full relative">
        {/* Base sidebar - always visible */}
        <div className="bg-teal-500 h-full flex-shrink-0" style={{ width: baseWidth + 'px' }}>
          {/* Icons list- */}
          {/* Icons list -revisit */}
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
          className="bg-teal-500 h-full overflow-hidden transition-all duration-300 flex-shrink-0"
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
        
        {/* Activities panel */}
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
              <h2 className="absoulute font-bold text-sm text-center text-[#00003c] mb-4">Latest Activities</h2>
              <div className="text-[#00003c]">
                {/* activity data */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
