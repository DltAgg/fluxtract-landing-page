import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { BackgroundGlow } from "@/components/shared/background-glow/BackgroundGlow";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluxtract",
  description: "All your documents structured. Instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <BackgroundGlow />
        {children}
      </body>
    </html>
  );
}
