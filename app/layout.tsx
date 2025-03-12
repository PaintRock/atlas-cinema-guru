import "@/app/global.css";
import { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#00003c] text-white`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
