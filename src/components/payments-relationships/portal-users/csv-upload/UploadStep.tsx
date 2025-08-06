import React, { useState, useRef, useCallback } from 'react';
import { X, File as FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

interface UploadStepProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export function UploadStep({ onFileSelect, selectedFile }: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileValidation = (file: File) => {
    const allowedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      setError('Invalid file type. Please upload a CSV or XLSX file.');
      onFileSelect(null);
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size exceeds 5MB.');
      onFileSelect(null);
      return false;
    }
    
    setError(null);
    onFileSelect(file);
    return true;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileValidation(e.target.files[0]);
    }
  };

  const handleDownloadTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('/templates/portal-users.csv', '_blank');
  };

  return (
    <div className="space-y-8">
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-6 border border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <img src="/lovable-uploads/f38987db-daaa-460a-b748-137cf3e679b8.png" alt="Upload file illustration" className="h-16" />
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 text-sm">Drop your file here or click to upload</h4>
          <p className="text-xs text-gray-500">Supported formats: CSV, XLSX • Up to 500 users</p>
        </div>
        <input
          type="file"
          accept=".csv,.xlsx"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600 text-center">
          ⚠️ There was an issue with your file. Please check the format and try again.
        </p>
      ) : selectedFile ? (
        <p className="text-sm text-gray-600 text-center">
          ✅ File uploaded. Continue to map fields and preview your data.
        </p>
      ) : (
        <div className="text-sm text-gray-600 text-center space-y-3">
          <p>Upload your list of portal users. We'll guide you through mapping and validation —</p>
          <p>or{" "}
            <button type="button" onClick={handleDownloadTemplate} className="text-primary underline font-medium">download our template</button>
          </p>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm flex items-center gap-2">
          <X className="h-4 w-4" /> {error}
        </div>
      )}

      {selectedFile && !error && (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
          <div className="flex items-center gap-3">
            <FileIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="font-medium text-sm">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {Math.round(selectedFile.size / 1024)} KB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFileSelect(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
