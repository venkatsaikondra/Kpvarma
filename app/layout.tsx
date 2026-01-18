import type { Metadata } from "next";
import "./globals.css";
import Menu from '@/components/menu/menu'
import {
  Gravitas_One,
  Manrope,
  Playfair_Display,
} from "next/font/google";

const gravitas = Gravitas_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gravitas",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "KP Varma | Portfolio",
  description: "Developer & Photographer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${gravitas.variable}
          ${manrope.variable}
          ${playfair.variable}
        `}
      >
        <Menu/>
        {children}
      </body>
    </html>
  );
}