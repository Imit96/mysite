"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function MediaPickerModal({ onSelect, children }: { onSelect: (url: string) => void, children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (open) {
      fetchFiles();
    }
  }, [open]);

  async function fetchFiles() {
    setLoading(true);
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });
    
    if (data) {
      // Filter out empty folders or non-image types
      const validFiles = data.filter(f => f.name !== ".emptyFolderPlaceholder" && (f.metadata?.mimetype?.startsWith("image/") || f.name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)));
      setFiles(validFiles);
    }
    setLoading(false);
  }

  function handleSelect(fileName: string) {
    const { data } = supabase.storage.from("media").getPublicUrl(fileName);
    onSelect(data.publicUrl);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<div className="w-full" />}>
        {children || (
          <Button type="button" variant="secondary" size="sm" className="w-full mt-2">
            <ImageIcon className="w-4 h-4 mr-2" /> Browse Library
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-6 bg-muted/20 border rounded-xl mt-4 shadow-inner">
          {loading ? (
            <div className="flex items-center justify-center p-24">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : files.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {files.map((file) => {
                const url = supabase.storage.from("media").getPublicUrl(file.name).data.publicUrl;
                return (
                  <div 
                    key={file.id} 
                    className="relative aspect-square border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-offset-2 ring-primary transition-all group"
                    onClick={() => handleSelect(file.name)}
                  >
                    <Image src={url} alt={file.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-white font-medium text-sm">Select</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-24 text-center flex flex-col items-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-medium">No images found.</p>
              <p className="text-muted-foreground mt-2">Upload images to your Media Library first.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
