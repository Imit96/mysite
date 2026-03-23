"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Pause, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./audio-provider";
import { Button } from "@/components/ui/button";

export function AudioMiniPlayer() {
  const { currentTrack, isPlaying, progress, duration, play, pause } = useAudio();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!currentTrack) {
      setIsVisible(false);
      return;
    }

    const playerElement = document.getElementById(`audio-player-${currentTrack.id}`);
    
    if (!playerElement) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(playerElement);
    return () => observer.disconnect();
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden z-50 flex items-center p-3 gap-4"
        >
          {/* Progress bar line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${(progress / (duration || 1)) * 100}%` }}
            />
          </div>

          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm relative pt-1">
            <Image src={currentTrack.coverArt || ""} alt={currentTrack.title} fill className="object-cover" />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h4 className="text-sm font-bold font-heading text-card-foreground truncate">{currentTrack.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>

          <div className="flex items-center gap-2 pt-1 shrink-0">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => isPlaying ? pause() : play(currentTrack)}
              className="w-10 h-10 rounded-full hover:bg-muted"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
            </Button>
            <Button
              size="icon"
              variant="ghost" 
              onClick={() => setIsVisible(false)}
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
