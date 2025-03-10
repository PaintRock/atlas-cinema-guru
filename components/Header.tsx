"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return ( 
        <div className="flex mt-0 h-12 w-full bg-teal-200 items-center px-4">
            {/* header content */}
            {/* Left side: Logo and title */}
            <div className="flex">
                <img 
                src="/icons/film.png" 
                alt="Logo" 
                className="h-4 w-4 mr-2" />
            </div>
            <div 
            className="font-bold text-lg text-[#00003c]"
            >
                Cinema Guru
            </div>
            {/* right side */}
            {/* logout button */}
            <div className="ml-auto flex items-center space-x-4">
                <button
                    onClick={() => console.log('Logout clicked')}
                className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <img 
                    src="/icons/power.png"
                    alt="Logout"
                    className="h-4 w-4" />
                </button>
               </div>
               </div>
    );
}
