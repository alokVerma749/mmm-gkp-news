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
  description: "Get campus updates",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${anticFont.variable} antialiased`}>
        <div className="h-[25vh] bg-foreground">
          <Header />
        </div>
        <div className="min-h-[50vh]">
          {children}
        </div>
        <div className="h-[25vh] bg-foreground">
          <Footer />
        </div>
      </body>
    </html>
  );
}
