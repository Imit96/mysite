import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { PageTransition } from "@/components/layout/page-transition";
import { Toaster } from "@/components/ui/sonner";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ojotimileyin.com"),
  title: {
    default: "Ojo Oluwatimileyin — Creative Director & Developer",
    template: "%s | Ojo Oluwatimileyin"
  },
  description: "I design, build, and produce digital experiences — from code to camera to sound. Full-stack developer, UI/UX designer, brand strategist, photographer, videographer, and music producer.",
  keywords: ["creative director", "full-stack developer", "UI/UX designer", "brand strategist", "photographer", "videographer", "music producer", "portfolio", "Lagos", "Nigeria"],
  authors: [{ name: "Ojo Oluwatimileyin" }],
  creator: "Ojo Oluwatimileyin",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ojo Oluwatimileyin",
    title: "Ojo Oluwatimileyin — Creative Director & Developer",
    description: "I design, build, and produce digital experiences — from code to camera to sound.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojo Oluwatimileyin — Creative Director & Developer",
    description: "I design, build, and produce digital experiences — from code to camera to sound.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col pt-0" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <PageTransition>
            <main className="flex-1 w-full pt-20">
              <Breadcrumbs />
              {children}
            </main>
          </PageTransition>
          <Footer />
          <ScrollToTop />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
