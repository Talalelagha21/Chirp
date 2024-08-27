import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chirp",
  description: 'A threads/twitter clone app called Chirp'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          
          <Topbar />

          <main className="flex flex-row">

            <LeftSidebar />

            <section className="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              
              <div className="w-full max-w-4xl">
                {children}
                </div>
            
            </section>
            
            <RightSidebar />
          
          </main>

          <Bottombar />
        
        </body>
      </html>
    </ClerkProvider>
  );
}
