"use client";

import { useState, useCallback, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, Copy, Check, File, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MediaManager() {
  const supabase = createClient();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("media").list("", {
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      toast.error("Failed to load media files");
      console.error(error);
    } else {
      // Filter out the empty placeholder file Supabase sometimes creates
      setFiles(data?.filter((file) => file.name !== ".emptyFolderPlaceholder") || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (eventFiles: FileList | null) => {
    if (!eventFiles || eventFiles.length === 0) return;

    setUploading(true);
    let uploadedCount = 0;

    for (let i = 0; i < eventFiles.length; i++) {
      const file = eventFiles[i];
      const fileExt = file.name.split(".").pop();
      // Generate a clean, unique filename
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error } = await supabase.storage
        .from("media")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error(error);
      } else {
        uploadedCount++;
      }
    }

    setUploading(false);
    if (uploadedCount > 0) {
      toast.success(`Successfully uploaded ${uploadedCount} file(s)`);
      fetchFiles();
    }
  };

  const handleDelete = async (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this file? This will break any case studies currently using it.")) return;

    const { error } = await supabase.storage.from("media").remove([fileName]);
    
    if (error) {
      toast.error("Failed to delete file");
      console.error(error);
    } else {
      toast.success("File deleted successfully");
      fetchFiles();
    }
  };

  const handleCopyUrl = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    const { data } = supabase.storage.from("media").getPublicUrl(fileName);
    if (data?.publicUrl) {
      navigator.clipboard.writeText(data.publicUrl);
      setCopiedId(fileName);
      toast.success("URL copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* UPLOAD ZONE */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "w-full border-2 border-dashed rounded-2xl p-12 text-center transition-all flex flex-col items-center justify-center min-h-[250px]",
          isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-muted/20 hover:bg-muted/50",
          uploading && "opacity-50 pointer-events-none"
        )}
      >
        <UploadCloud className={cn("w-12 h-12 mb-4 text-muted-foreground", isDragging && "text-primary animate-bounce")} />
        <h3 className="text-xl font-heading font-semibold mb-2">
          {uploading ? "Uploading files..." : "Upload Media Assets"}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          Drag and drop your images, videos, or audio files here, or click to browse. Max file size: 50MB.
        </p>
        <div className="relative overflow-hidden inline-block">
          <Button variant={isDragging ? "default" : "secondary"} disabled={uploading}>
            {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Select Files
          </Button>
          <input
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            onChange={(e) => handleUpload(e.target.files)}
            accept="image/*,video/*,audio/*"
            disabled={uploading}
            title="Upload Files"
          />
        </div>
      </div>

      {/* ASSET GALLERY */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-bold tracking-tight text-xl">Media Library</h3>
          <span className="text-sm text-muted-foreground">{files.length} items</span>
        </div>

        {loading ? (
          <div className="py-24 flex items-center justify-center text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : files.length === 0 ? (
          <div className="bg-card border rounded-2xl p-12 text-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Your media library is empty. Upload some files above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file) => {
              const { data } = supabase.storage.from("media").getPublicUrl(file.name);
              const url = data.publicUrl;
              const isImage = file.metadata?.mimetype?.startsWith("image/");
              const isVideo = file.metadata?.mimetype?.startsWith("video/");

              return (
                <div key={file.id} className="group border bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                  {/* PREVIEW */}
                  <div 
                    className="relative aspect-square bg-muted flex items-center justify-center shrink-0 cursor-pointer"
                    onClick={() => setSelectedMedia(url)}
                  >
                    {isImage ? (
                      <Image src={url} alt={file.name} fill className="object-cover" />
                    ) : isVideo ? (
                      <video src={url} className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <File className="w-12 h-12 text-muted-foreground/50" />
                    )}
                    
                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                      <Button size="icon" variant="secondary" onClick={(e) => handleCopyUrl(e, file.name)} title="Copy URL">
                        {copiedId === file.name ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button size="icon" variant="destructive" onClick={(e) => handleDelete(e, file.name)} title="Delete file">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* DETAILS */}
                  <div className="p-3 text-xs flex-1 flex flex-col justify-between hidden group-hover:flex">
                    <p className="truncate font-mono" title={file.name}>{file.name}</p>
                    <p className="text-muted-foreground flex justify-between mt-1">
                      <span>{(file.metadata?.size / 1024).toFixed(1)} KB</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* LIGHTBOX DIALOG */}
      <Dialog open={selectedMedia !== null} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        <DialogContent className="max-w-6xl w-full h-[80vh] bg-transparent border-none shadow-none flex items-center justify-center p-0">
          {selectedMedia !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Button variant="ghost" size="icon" className="absolute top-0 right-0 z-50 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full w-10 h-10" onClick={() => setSelectedMedia(null)}>
                <X className="w-6 h-6" />
              </Button>

              <div className="relative w-full h-full flex items-center justify-center p-8">
                {selectedMedia.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={selectedMedia} className="max-w-full max-h-full rounded-md shadow-2xl" controls autoPlay playsInline />
                ) : (
                  <img src={selectedMedia} alt="Fullscreen preview" className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl" />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
