'use client'
import "@/app/global.css";
import { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import { Suspense } from "react";

// export const metadata: Metadata = {
//   title: "Cinema Guru | Atlas School",
// };

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#00003c] text-white`}>
        <ClientLayout>
          <Suspense>
          {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
