import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface FileUploadOptions {
  onProgress?: (file: File, progress: number) => void;
  onSuccess?: (file: File) => void;
  onError?: (file: File, error: Error) => void;
}

export interface FileUploadProps {
  onUpload?: (files: File[], options: FileUploadOptions) => Promise<void>;
  onFileSelect?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export function FileUpload({
  onUpload,
  onFileSelect,
  multiple = false,
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 1,
  disabled = false,
  className,
  children,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [completedFiles, setCompletedFiles] = useState<File[]>([]);

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const errors: string[] = [];
    const valid: File[] = [];

    if (files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} file(s) allowed`);
      return { valid: [], errors };
    }

    files.forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`${file.name} exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
      } else {
        valid.push(file);
      }
    });

    return { valid, errors };
  };

  const handleFiles = async (files: File[]) => {
    const { valid, errors } = validateFiles(files);
    
    if (errors.length > 0) {
      console.error('File validation errors:', errors);
      return;
    }

    if (onFileSelect) {
      onFileSelect(valid);
    }

    if (onUpload && valid.length > 0) {
      // Initialize uploading state
      const initialUploads = valid.map(file => ({
        file,
        progress: 0,
        status: 'uploading' as const,
      }));
      setUploadingFiles(initialUploads);

      const uploadOptions: FileUploadOptions = {
        onProgress: (file, progress) => {
          setUploadingFiles(prev => 
            prev.map(upload => 
              upload.file === file 
                ? { ...upload, progress }
                : upload
            )
          );
        },
        onSuccess: (file) => {
          setUploadingFiles(prev => 
            prev.map(upload => 
              upload.file === file 
                ? { ...upload, status: 'success', progress: 100 }
                : upload
            )
          );
          setCompletedFiles(prev => [...prev, file]);
        },
        onError: (file, error) => {
          setUploadingFiles(prev => 
            prev.map(upload => 
              upload.file === file 
                ? { ...upload, status: 'error', error: error.message }
                : upload
            )
          );
        },
      };

      try {
        await onUpload(valid, uploadOptions);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [disabled, onUpload, onFileSelect]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
    e.target.value = ''; // Reset input
  };

  const removeFile = (fileToRemove: File) => {
    setCompletedFiles(prev => prev.filter(f => f !== fileToRemove));
    setUploadingFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const clearAll = () => {
    setCompletedFiles([]);
    setUploadingFiles([]);
  };

  if (children) {
    return (
      <div
        className={cn("relative", className)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {children}
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card 
        className={cn(
          "border-2 border-dashed transition-all duration-300 cursor-pointer",
          isDragging && !disabled
            ? "border-primary bg-primary/5 scale-[1.01] shadow-lg"
            : "border-gray-300 hover:border-primary/60 hover:bg-gray-50/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <CardContent 
          className="p-8 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && document.getElementById('file-upload-input')?.click()}
        >
          <div className="space-y-4">
            <div className={cn(
              "inline-flex items-center justify-center w-16 h-16 rounded-xl transition-all duration-300",
              isDragging && !disabled
                ? "bg-primary/10 scale-105 border-2 border-primary"
                : "bg-gray-50 hover:bg-primary/5 border-2 border-transparent hover:border-primary/30"
            )}>
              <Upload className={cn(
                "w-6 h-6 transition-all duration-300",
                isDragging && !disabled
                  ? "text-primary scale-110"
                  : "text-gray-400 hover:text-primary"
              )} />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  {isDragging && !disabled ? (
                    <span className="text-primary">Drop your file here</span>
                  ) : (
                    'Upload your files'
                  )}
                </h4>
                
                {!isDragging && (
                  <p className="text-sm text-gray-600">
                    Drag and drop your files here, or{" "}
                    <button 
                      type="button"
                      className="text-primary hover:text-primary/80 font-medium underline decoration-2 underline-offset-2 hover:decoration-primary/60 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('file-upload-input')?.click();
                      }}
                      disabled={disabled}
                    >
                      browse files
                    </button>
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {accept === '.csv' ? 'Supporting .csv file' : accept === '*/*' ? 'Any file type' : accept}
                </span>
                <span className="text-gray-300">•</span>
                <span>Max {Math.round(maxSize / 1024 / 1024)}MB</span>
              </div>
            </div>
          </div>

          <input
            id="file-upload-input"
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleFileSelect}
            disabled={disabled}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Upload Progress - Only show files that are still uploading or have errors */}
      {uploadingFiles.filter(f => f.status !== 'success').length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.filter(f => f.status !== 'success').map((upload, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {upload.status === 'uploading' && (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  )}
                  {upload.status === 'error' && (
                    <X className="w-4 h-4 text-red-600" />
                  )}

                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">
                      {upload.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(upload.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {upload.status === 'uploading' && (
                    <div className="w-32">
                      <Progress value={upload.progress} className="h-2" />
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(upload.file);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {upload.status === 'error' && upload.error && (
                <p className="text-xs text-red-600 mt-2">{upload.error}</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Completed Files */}
      {completedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-gray-900">
              Uploaded Files ({completedFiles.length})
            </h5>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>
          
          {completedFiles.map((file, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}