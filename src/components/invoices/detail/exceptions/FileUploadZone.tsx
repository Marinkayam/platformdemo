
import React from "react";
import { toast } from "@/hooks/use-toast";

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
}

export function FileUploadZone({ onFileUpload }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = React.useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndUploadFile(file);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndUploadFile(file);
    }
  };

  const validateAndUploadFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }
    
    onFileUpload(file);
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'} p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <div className="space-y-1">
        <p className="text-sm text-gray-600">
          Drag & drop a file here or <span className="text-primary underline">click to browse</span>
        </p>
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          accept=".pdf" 
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
}
