"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";

interface ImageInfo {
  url: string;
  cloudinaryId: string;
}

interface ImageUploaderProps {
  images: ImageInfo[];
  onChange: (images: ImageInfo[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 8 }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const uploadedImages: ImageInfo[] = [];

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      try {
        const sigRes = await fetch("/api/admin/upload/signature", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "km-engineering" })
        });
        const { signature, timestamp, folder, api_key } = await sigRes.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        const uploadRes = await fetch("https://api.cloudinary.com/v1_1/gksfzjxf/image/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        
        if (uploadData.secure_url) {
          uploadedImages.push({
            url: uploadData.secure_url,
            cloudinaryId: uploadData.public_id,
          });
        }
        setUploadProgress(Math.round(((i + 1) / acceptedFiles.length) * 100));
      } catch (error) {
        console.error("Upload failed for file", file.name, error);
      }
    }

    onChange([...images, ...uploadedImages]);
    setIsUploading(false);
  }, [images, maxImages, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    disabled: isUploading || images.length >= maxImages
  });

  const handleDelete = async (index: number) => {
    const imageToDelete = images[index];
    
    // Optimistically update UI
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);

    try {
      await fetch(`/api/admin/upload/${encodeURIComponent(imageToDelete.cloudinaryId)}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[index - 1];
    newImages[index - 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
  };

  const moveRight = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index + 1];
    newImages[index + 1] = newImages[index];
    newImages[index] = temp;
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-brand-accent bg-brand-accent/5" : "border-slate-300 hover:border-brand-primary",
          (isUploading || images.length >= maxImages) && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center space-y-2 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
            <p>Uploading... {uploadProgress}%</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2 text-slate-500">
            <UploadCloud className="h-8 w-8 text-slate-400" />
            <p className="font-medium text-slate-700">Drag & drop images here</p>
            <p className="text-sm">or click to select files</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-slate-500">
        <span>{images.length}/{maxImages} images</span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={img.cloudinaryId} className="relative group rounded-md overflow-hidden border border-slate-200 aspect-square bg-slate-50">
              <CldImage 
                src={img.url.includes('res.cloudinary.com') ? img.url.split('/upload/v1/')[1] || img.url : img.url} 
                alt={`Upload ${idx}`} 
                fill 
                sizes="150px"
                className="object-cover" 
              />
              
              {idx === 0 && (
                <div className="absolute top-2 left-2 bg-brand-primary text-white text-xs px-2 py-1 rounded">
                  Cover
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-center space-x-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7 bg-white text-black hover:bg-slate-200"
                    onClick={(e) => { e.stopPropagation(); moveLeft(idx); }}
                    disabled={idx === 0}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7 bg-white text-black hover:bg-slate-200"
                    onClick={(e) => { e.stopPropagation(); moveRight(idx); }}
                    disabled={idx === images.length - 1}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
