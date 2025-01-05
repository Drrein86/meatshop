"use client";
import { useEffect } from "react";
import { MyProvider } from "../app/context/MyContext";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./components/CartContext";
import eruda from "eruda"; // ייבוא של Eruda

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      eruda.init(); // אתחול של Eruda רק בסביבת פיתוח
    }
  }, []);

  return (
    <MyProvider>
      <CartProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Header />
            {children}
          </body>
        </html>
      </CartProvider>
    </MyProvider>
  );
}
