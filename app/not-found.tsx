'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/" className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full">
        Return to Homepage
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
