
import React from "react";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  uploadProgress: number;
  isUploading: boolean;
}

export function UploadProgress({ uploadProgress, isUploading }: UploadProgressProps) {
  if (!isUploading) {
    return null;
  }
  
  return (
    <div className="mt-2">
      <p className="text-sm mb-1">Uploading PDF...</p>
      <Progress value={uploadProgress} className="h-2" />
      <p className="text-xs text-right mt-1 text-gray-500">{uploadProgress}%</p>
    </div>
  );
}
