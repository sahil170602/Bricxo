import type { Metadata } from "next";
import "./globals.css";
// ✅ IMPORT THE PROVIDER
import { CartProvider } from "@/context/CartContext"; 

export const metadata: Metadata = {
  title: "BRICXO",
  description: "Construction Materials at Factory Prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="antialiased">
        {/* ✅ WRAP CHILDREN WITH CART PROVIDER */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}