"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoShowreelProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

export function VideoShowreel({ videoSrc, posterSrc, className }: VideoShowreelProps) {
  const [isPlaying, setIsPlaying] = useState(true); // Default to true per user request
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play the video robustly on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Autoplay blocked, falling back to paused state:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={cn("relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden bg-muted group cursor-pointer shadow-lg", className)} onClick={togglePlay}>
      {!isPlaying && posterSrc && (
        <Image
          src={posterSrc}
          alt="Showreel poster"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        playsInline
        loop
        muted
        autoPlay
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 flex items-center justify-center ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 md:w-28 md:h-28 bg-primary/95 rounded-full flex items-center justify-center text-primary-foreground backdrop-blur-sm shadow-xl"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 md:w-10 md:h-10 fill-current" />
          ) : (
            <Play className="w-8 h-8 md:w-10 md:h-10 ml-2 fill-current" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
