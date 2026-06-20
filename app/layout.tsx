import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer, Header } from "@/components/layout";
import { FavoritesProvider, SearchProvider } from "@/context";

import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import "react-day-picker/dist/style.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StaySphere",
  description:
    "Plataforma moderna de alojamientos con Next.js, TypeScript y Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-neutral-50 text-neutral-950"
      >
        <SearchProvider>
          <FavoritesProvider>
            <div className="flex min-h-full flex-col">
              <Header />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
            </div>
          </FavoritesProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
