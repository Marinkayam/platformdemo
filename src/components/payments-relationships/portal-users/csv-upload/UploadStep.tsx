
import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, X, File as FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-lg p-10 text-center transition-colors cursor-pointer",
          isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-12 w-12 text-gray-400" />
        <h4 className="font-semibold text-gray-900 text-lg">Drop your file here or click to upload</h4>
        <p className="text-sm text-gray-500">Supported formats: CSV, XLSX • Up to 500 users</p>
        <input
          type="file"
          accept=".csv,.xlsx"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </div>

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

      <div className="text-center">
        <Button variant="link" onClick={() => window.open('/templates/portal-users.csv', '_blank')}>
          <Download className="h-4 w-4 mr-2" />
          Download Monto's CSV Template
        </Button>
      </div>
    </div>
  );
}
