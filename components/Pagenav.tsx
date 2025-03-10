"use client";
import React, { useState } from 'react';

export default function Pagenav() {
    return (
      <div className="flex">
        <div className="bg-teal-500 rounded-full overflow-hidden flex w-72 h-20">
          <button className="w-1/2 text-white font-medium hover:bg-teal-600">
            Previous
          </button>
          <div className="w-px bg-teal-600"></div>
          <button className="w-1/2 text-white font-medium hover:bg-teal-600">
            Next
          </button>
        </div>
      </div>
    );
}
