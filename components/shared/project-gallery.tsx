"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="my-16">
      <h3 className="text-3xl font-heading font-bold mb-8">Gallery</h3>
      
      {/* MASONRY GRID */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, idx) => {
          const isVideo = src.match(/\.(mp4|webm|ogg)$/i);
          return (
            <div 
              key={idx} 
              className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group bg-muted border border-border shadow-sm group"
              onClick={() => setSelectedIdx(idx)}
            >
              <div className="relative w-full aspect-[4/3]">
                {isVideo ? (
                  <>
                    <video src={src} className="w-full h-full object-cover" muted playsInline />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity group-hover:bg-black/40">
                      <div className="bg-primary/90 text-primary-foreground p-3 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                        <Play className="w-6 h-6 ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <Image 
                    src={src} 
                    alt={`Gallery asset ${idx + 1}`} 
                    fill 
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" 
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX DIALOG */}
      <Dialog open={selectedIdx !== null} onOpenChange={(open) => !open && setSelectedIdx(null)}>
        <DialogContent className="max-w-6xl w-full h-[80vh] bg-transparent border-none shadow-none flex items-center justify-center p-0">
          {selectedIdx !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              
              {images.length > 1 && (
                <>
                  <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full w-12 h-12" onClick={handlePrev}>
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full w-12 h-12" onClick={handleNext}>
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}

              <Button variant="ghost" size="icon" className="absolute top-0 right-0 z-50 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full w-10 h-10" onClick={() => setSelectedIdx(null)}>
                <X className="w-6 h-6" />
              </Button>

              <div className="relative w-full h-full flex items-center justify-center p-8">
                {images[selectedIdx].match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={images[selectedIdx]} className="max-w-full max-h-full rounded-md shadow-2xl" controls autoPlay playsInline />
                ) : (
                  <img src={images[selectedIdx]} alt="Fullscreen view" className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl" />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
