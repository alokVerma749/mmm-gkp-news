import type { Metadata } from "next";
import { Antic } from "next/font/google";
import "./globals.css";

const anticFont = Antic({
  weight: "400",
  variable: "--font-antic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MMMUT GKP NEWS",
  description: "Get campus updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anticFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
