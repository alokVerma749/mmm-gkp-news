import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Antic } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const anticFont = Antic({
  weight: "400",
  variable: "--font-antic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MMMUT GKP NEWS",
  description:
    "Stay updated with the latest news, events, and updates from MMMUT GKP. Get insights on campus life, departmental activities, hostel news, library resources, upcoming events, placement opportunities, alumni stories, admissions, and scholarships. Your go-to source for all MMMUT GKP updates.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anticFont.variable} antialiased relative`}>
        <div className="bg-[#020809]">
          <Header />
        </div>
        <div className="min-h-[80vh] w-full bg-[#F3F2EA]">
          {children}
          <Analytics />
        </div>
        <div className="h-[25vh] bg-foreground">
          <Footer />
        </div>
      </body>
    </html>
  );
}
