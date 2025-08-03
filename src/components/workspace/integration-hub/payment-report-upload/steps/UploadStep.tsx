
import React, { useCallback, useState } from 'react';
import { Upload, Download, Sparkles, Clock, Zap, FileText, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UploadStepProps {
  onFileUpload: (file: File) => void;
}

export function UploadStep({ onFileUpload }: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          setTimeout(() => {
            onFileUpload(file);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    if (file) {
      setUploadedFile(file);
      simulateUpload(file);
    }
  }, [onFileUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateUpload(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="text-sm font-medium text-primary mb-2">Step 1 of 4</div>
        <p className="text-base text-grey-600 max-w-lg mx-auto">
          Upload your ERP report to match payments, skip paid invoices, and auto-create RTPs—instantly.
        </p>
      </div>

      <div className="space-y-6">
          {/* Upload Zone */}
          <Card className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
            isDragging 
              ? 'border-primary bg-primary/5 scale-[1.02]' 
              : 'border-grey-300 hover:border-primary/50'
          }`}>
            <CardContent 
              className="p-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !isUploading && document.getElementById('file-upload')?.click()}
            >
              <div className="space-y-4">
                {isUploading ? (
                  <>
                    {/* Loading State */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-grey-900">
                        Uploading {uploadedFile?.name}...
                      </h4>
                      
                      <div className="max-w-xs mx-auto">
                        <div className="bg-grey-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-grey-600 mt-2">
                          {Math.round(uploadProgress)}% complete
                        </p>
                      </div>
                    </div>
                  </>
                ) : uploadComplete ? (
                  <>
                    {/* Success State */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-grey-900">
                        Upload Complete!
                      </h4>
                      
                      <p className="text-sm text-grey-600">
                        {uploadedFile?.name} has been successfully uploaded
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Default State */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl transition-all duration-200 ${
                      isDragging 
                        ? 'bg-primary/20 scale-110' 
                        : 'bg-grey-50 hover:bg-primary/5'
                    }`}>
                      <img 
                        src="/lovable-uploads/eb3891f0-219d-4575-9f07-3c12091a0aec.png" 
                        alt="Upload" 
                        className={`w-12 h-12 transition-all duration-200 ${
                          isDragging 
                            ? 'opacity-100 scale-110' 
                            : 'opacity-60 hover:opacity-100'
                        }`} 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-base font-medium text-grey-900">
                        {isDragging ? 'Drop your file here' : (
                          <>
                            Drop your file here or{" "}
                            <button 
                              type="button"
                              className="text-primary underline hover:text-primary/80 font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                document.getElementById('file-upload')?.click();
                              }}
                            >
                              browse
                            </button>
                          </>
                        )}
                      </h4>
                      
                      <p className="text-xs text-grey-600">
                        Upload your ERP payment report
                      </p>
                      
                      <p className="text-xs text-grey-500">
                        Supported: CSV • Up to 10MB each
                      </p>
                      
                      <p className="text-xs text-grey-500 mt-2">
                        Need help formatting your data?{" "}
                        <button 
                          type="button"
                          className="text-primary underline hover:text-primary/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('/templates/portal-users.csv', '_blank');
                          }}
                        >
                          Download monto's template
                        </button>
                      </p>
                    </div>
                  </>
                )}

                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>
            </CardContent>
          </Card>

        </div>

      {/* Smart Benefits - Only show after upload or as preview */}
      {uploadedFile && (
        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center space-y-2 opacity-75">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-success-main/10 rounded-lg">
              <Zap className="w-4 h-4 text-success-main" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-grey-900">Auto-Match</h4>
              <p className="text-xs text-grey-600">Payment relationships</p>
            </div>
          </div>

          <div className="text-center space-y-2 opacity-75">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-warning-main/10 rounded-lg">
              <Clock className="w-4 h-4 text-warning-main" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-grey-900">Skip Paid</h4>
              <p className="text-xs text-grey-600">No tracking needed</p>
            </div>
          </div>

          <div className="text-center space-y-2 opacity-75">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-grey-900">Create RTPs</h4>
              <p className="text-xs text-grey-600">Intelligent automation</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
