import "@/app/global.css";
import { Metadata } from "next";
import Sidebar from "@/components/Sidenav";
import { auth } from "@/auth";    
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased  bg-[#00003c] text-white`}>
      <div className="flex flex-col h-screen">
      {/* Header at the top */}
      <Header />
      
      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
      </body>
    </html>
  );
}
