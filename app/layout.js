import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://luxespace.com"),
  title: {
    template: "%s | LuxeSpace Interiors",
    default: "LuxeSpace Interiors | Crafting Timeless Luxury Spaces",
  },
  description: "Award-winning luxury interior design studio specializing in timeless, minimal, and sophisticated spaces for high-end residential and commercial projects.",
  keywords: ["Luxury Interior Design", "Minimalist Interiors", "High-end Residential", "Boutique Hotel Design", "LuxeSpace Interiors"],
  openGraph: {
    title: "LuxeSpace Interiors | Crafting Timeless Luxury Spaces",
    description: "Award-winning luxury interior design studio specializing in timeless, minimal, and sophisticated spaces.",
    url: "https://luxespace.com", // Placeholder
    siteName: "LuxeSpace Interiors",
    images: [
      {
        url: "/images/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
        alt: "LuxeSpace Interiors Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeSpace Interiors",
    description: "Crafting Timeless Luxury Spaces.",
    images: ["/images/og-image.jpg"], // Placeholder
  },
  alternates: {
    canonical: "https://luxespace.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
