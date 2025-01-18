"use client";
import { MyProvider } from "../app/context/MyContext"; // ייבוא הקונטקסט
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./components/CartContext";
import { SessionProvider } from "next-auth/react";
import { Rubik } from "next/font/google";

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
const rubik = Rubik({
  subsets: ["hebrew", "latin"], // תת-שפות (תמיכה בעברית)
  weight: ["400", "500", "700"], // משקלים
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MyProvider>
      <SessionProvider>
        <CartProvider>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} ${rubik.className} antialiased`}
            >
              <Header />
              {children}
            </body>
          </html>
        </CartProvider>
      </SessionProvider>
    </MyProvider>
  );
}
