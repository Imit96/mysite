"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import Lenis from "lenis";
import { useEffect } from "react";
import { AudioProvider } from "@/components/audio/audio-provider";
import { AudioMiniPlayer } from "@/components/audio/audio-mini-player";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <AudioProvider>
        {children}
        <AudioMiniPlayer />
      </AudioProvider>
    </NextThemesProvider>
  );
}
