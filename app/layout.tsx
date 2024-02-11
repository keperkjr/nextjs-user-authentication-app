import type { Metadata } from "next";
import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import TopNav from "@/components/TopNav";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/components/NextAuthProvider";

export const metadata: Metadata = {
  title: "Nextjs - User authentication app",
  description: " User authentication app using Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
            <NextAuthProvider>
                <TopNav />
                <Toaster />
                {children}
            </NextAuthProvider>
        </body>            
    </html>
  );
}
