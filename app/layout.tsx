import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import LayoutWrapper from "./components/LayoutWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pimjo - E-commerce Store",
  description: "Shop the latest fashion trends at Pimjo",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSans.className} antialiased`}
      >
        <ThemeProvider>
          <SessionProviderWrapper>
            <WishlistProvider>
              <CartProvider>
                <LayoutWrapper>
                  <main className="min-h-screen">
                    {children}
                  </main>
                </LayoutWrapper>
              </CartProvider>
            </WishlistProvider>
          </SessionProviderWrapper>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
