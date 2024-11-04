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
      <body className={`${montserrat.className} antialiased flex bg-gray-300`}>
          <Menu4Layout />
        <div className="ml-64 w-full flex justify-center items-center">
        {children}
        </div>
      </body>
    </html>
  );
}
