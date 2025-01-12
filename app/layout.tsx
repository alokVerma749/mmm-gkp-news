import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Antic } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const anticFont = Antic({
  weight: "400",
  variable: "--font-antic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MMMUT GKP NEWS",
  description: "Stay updated with the latest news, events, and updates from MMMUT GKP. Get insights on campus life, departmental activities, hostel news, library resources, upcoming events, placement opportunities, alumni stories, admissions, and scholarships. Your go-to source for all MMMUT GKP updates.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anticFont.variable} antialiased relative`}>
        <div className="bg-[#1A1A1A] lg:bg-foreground">
          <Header />
        </div>
        <div className="min-h-[80vh] w-full bg-[#F3F2EA] lg:pb-6">
          {children}
          <Toaster />
          <Analytics />
          <GoogleTagManager gtmId={process.env.GID || 'G-1GNF1XZNX3'} />
        </div>
        <div className="h-auto bg-[#1A1A1A] lg:h-[25dvh] lg:bg-foreground">
          <Footer />
        </div>
      </body>
    </html>
  );
}
