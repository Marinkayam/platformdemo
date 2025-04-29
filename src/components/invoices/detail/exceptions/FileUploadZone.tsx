
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
}

export function FileUploadZone({ onFileUpload }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  
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
      className={`mt-6 border-2 border-dashed rounded-lg ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'} p-6 text-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="space-y-3">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/ebcce64a-0659-4d7a-a5b0-d49ff4b510e2.png" 
            alt="Upload illustration" 
            className="h-24 w-auto mb-2"
          />
        </div>
        <h3 className="text-base font-medium">Drag & Drop or Browse to upload your corrected invoice PDF</h3>
        <p className="text-sm text-gray-500">
          This invoice must include the updated PO number required by the buyer.
        </p>
        <div>
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="bg-primary text-white px-4 py-2 rounded-md inline-block hover:bg-primary/90 transition-colors">
              Select File
            </div>
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              accept=".pdf" 
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
