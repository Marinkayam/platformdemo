
import React, { useState } from 'react';
import { FileUpload, FileUploadOptions } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';

interface UploadStepProps {
  onFileUpload: (file: File | null) => void;
}

export function UploadStep({ onFileUpload }: UploadStepProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: File[], { onProgress, onSuccess, onError }: FileUploadOptions) => {
    const file = files[0]; // Only handle first file
    if (!file) return;

    setIsUploading(true);
    setUploadedFile(file);
    onFileUpload(file); // Enable Next button immediately

    try {
      // Simulate upload progress
      const totalChunks = 10;
      let uploadedChunks = 0;

      for (let i = 0; i < totalChunks; i++) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
        
        uploadedChunks++;
        const progress = (uploadedChunks / totalChunks) * 100;
        onProgress?.(file, progress);
      }

      // Simulate server processing
      await new Promise(resolve => setTimeout(resolve, 500));
      onSuccess?.(file);
      setIsUploading(false);
    } catch (error) {
      onError?.(file, error instanceof Error ? error : new Error("Upload failed"));
      setIsUploading(false);
    }
  };

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    onFileUpload(null);
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Step Header */} 
      <div className="text-center space-y-2">
        <div className="text-sm font-medium text-primary mb-1">Step 1 of 4</div>
        <p className="text-base max-w-lg mx-auto" style={{ color: '#000000' }}>
          Upload your ERP report to match payments, skip paid invoices, and auto-create RTPs—instantly.
        </p>
      </div>

      {/* File Upload Component */}
      <FileUpload
        onUpload={handleUpload}
        onFileSelect={handleFileSelect}
        accept=".csv"
        maxSize={10 * 1024 * 1024} // 10MB
        maxFiles={1}
        disabled={isUploading}
      />

      {/* Template Download Link */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Need help with formatting?{" "}
          <button 
            type="button"
            className="text-primary hover:text-primary/80 font-medium underline decoration-1 underline-offset-2"
            onClick={() => window.open('/templates/portal-users.csv', '_blank')}
          >
            Download our template
          </button>
        </p>
      </div>

    </div>
  );
}
