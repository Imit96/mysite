"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudio, Track } from "./audio-provider";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";

interface AudioTrackPlayerProps {
  track: Track;
}

export function AudioTrackPlayer({ track }: AudioTrackPlayerProps) {
  const { currentTrack, isPlaying, progress, duration, play, pause, seek, volume, setVolume } = useAudio();
  const playerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const isActive = currentTrack?.id === track.id;
  const displayProgress = isActive ? progress : 0;
  const displayDuration = isActive ? duration : 0;

  const togglePlay = () => {
    if (isActive) {
      if (isPlaying) pause();
      else play(track);
    } else {
      play(track);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (value: number | readonly number[]) => {
    if (isActive) {
      const val = Array.isArray(value) ? value[0] : (value as number);
      seek(val);
    }
  };

  return (
    <div ref={playerRef} className="w-full bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-center gap-6" id={`audio-player-${track.id}`}>
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 shadow-md">
        <Image src={track.coverArt || ""} alt={track.title} fill className="object-cover" />
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-heading text-card-foreground">{track.title}</h3>
            <p className="text-muted-foreground font-medium">{track.artist}</p>
          </div>
          <Button
            size="icon"
            onClick={togglePlay}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shrink-0"
          >
            {isActive && isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
          </Button>
        </div>

        <div className="space-y-2">
          <Slider
            value={[displayProgress]}
            max={displayDuration || 100}
            step={1}
            onValueChange={handleSeek}
            disabled={!isActive}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs font-medium text-muted-foreground font-mono">
            <span>{formatDuration(displayProgress)}</span>
            <span>{formatDuration(displayDuration)}</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 shrink-0 px-4 border-l border-border h-full">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
}
