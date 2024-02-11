'use client'
import type { Metadata } from "next";
import './globals.css'
//import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"
import TopNav from "@/components/TopNav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Nextjs - User authentication app",
//   description: " User authentication app using Nextjs",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <SessionProvider>
            <body>
                <TopNav />
                <Toaster />
                {children}
            </body>            
        </SessionProvider>
    </html>
  );
}
