import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import { Menu4Layout } from "./_components/Menu4Layout";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: "BackOffice | Sapore",
  description: "Sapore BackOffice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`grid-layout ${montserrat.className} antialiased bg-gray-300`}>
          <Menu4Layout />
        <div className="row-start-2 md:col-start-2 md:row-start-1">
        {children}
        </div>
      </body>
    </html>
  );
}
