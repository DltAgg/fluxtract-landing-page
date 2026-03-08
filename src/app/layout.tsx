import type { Metadata } from "next";
import { Outfit, League_Spartan } from "next/font/google";
import "./globals.css";
import { BackgroundGlow } from "@/components/shared/background-glow/BackgroundGlow";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Fluxtract",
  description: "All your documents structured. Instantly.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${leagueSpartan.variable}`}>
        <BackgroundGlow />
        {children}
      </body>
    </html>
  );
}
