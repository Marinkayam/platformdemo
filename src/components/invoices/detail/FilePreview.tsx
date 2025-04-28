
import React from "react";
import { File, FileImage, FileText, FileAudio, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface FilePreviewProps {
  file: FileAttachment;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

export function FilePreview({ file, onDelete, showDeleteButton = true }: FilePreviewProps) {
  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    } else if (file.type.startsWith("audio/")) {
      return <FileAudio className="h-5 w-5 text-green-500" />;
    } else if (file.type === "application/pdf" || file.type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />;
    }
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(file.url, "_blank");
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-md bg-gray-100 p-2 my-2">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleClick}>
        {getFileIcon()}
        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
      </div>
      {showDeleteButton && onDelete && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
