
import React, { useCallback, useState } from 'react';
import { Upload, Download, Sparkles, Clock, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UploadStepProps {
  onFileUpload: (file: File) => void;
}

export function UploadStep({ onFileUpload }: UploadStepProps) {
  const [uploadMode, setUploadMode] = useState<'real' | 'demo'>('real');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
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
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="text-sm font-medium text-primary mb-2">Step 1 of 4</div>
        <h3 className="text-2xl font-semibold text-grey-900">Upload Payment Report</h3>
        <p className="text-base text-grey-600 max-w-lg mx-auto">
          Upload your ERP report to match payments, skip paid invoices, and auto-create RTPs—instantly.
        </p>
      </div>

      {/* Mode Toggle - Navbar Style */}
      <div className="flex justify-center">
        <nav className="bg-white border border-grey-200 rounded-lg p-1 shadow-sm">
          <div className="flex">
            <button
              onClick={() => setUploadMode('real')}
              className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
                uploadMode === 'real'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-grey-600 hover:text-grey-900 hover:bg-grey-50'
              }`}
            >
              Upload Your Data
            </button>
            <button
              onClick={() => setUploadMode('demo')}
              className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
                uploadMode === 'demo'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-grey-600 hover:text-grey-900 hover:bg-grey-50'
              }`}
            >
              Try Demo
            </button>
          </div>
        </nav>
      </div>

      {uploadMode === 'real' ? (
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
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <div className="space-y-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                  isDragging 
                    ? 'bg-primary/20 scale-110' 
                    : 'bg-grey-50 hover:bg-primary/5'
                }`}>
                  <Upload className={`w-6 h-6 transition-colors duration-200 ${
                    isDragging 
                      ? 'text-primary' 
                      : 'text-grey-400 hover:text-primary'
                  }`} />
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-grey-900">
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
                  
                  <p className="text-sm text-grey-600">
                    Upload your ERP payment report (CSV, Excel) or invoice PDFs for demo
                  </p>
                  
                  <p className="text-xs text-grey-500">
                    Supported: CSV, XLSX, PDF • Up to 10MB each
                  </p>
                </div>

                <input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Template Download */}
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" className="text-grey-600 hover:text-primary gap-2 text-sm">
              <Download className="w-4 h-4" />
              Need help formatting your data? Download template
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Demo Upload Zone */}
          <Card className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
            isDragging 
              ? 'border-primary bg-primary/5 scale-[1.02]' 
              : 'border-primary/30 hover:border-primary/50 bg-gradient-to-br from-primary/5 to-primary/2'
          }`}>
            <CardContent 
              className="p-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('demo-file-upload')?.click()}
            >
              <div className="space-y-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 ${
                  isDragging 
                    ? 'bg-primary/20 scale-110' 
                    : 'bg-white shadow-sm border border-primary/20'
                }`}>
                  <Sparkles className={`w-8 h-8 transition-colors duration-200 ${
                    isDragging 
                      ? 'text-primary' 
                      : 'text-primary'
                  }`} />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-grey-900">
                    Want to see Monto's magic in action?
                  </h4>
                  
                  <p className="text-base text-grey-700 max-w-md mx-auto leading-relaxed">
                    Upload just a few invoice PDFs and we'll take it from there—Monto will automatically identify payment relationships and show you how it all connects.
                  </p>
                  
                  <div className="pt-2">
                    <Button 
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('demo-file-upload')?.click();
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Invoice PDFs
                    </Button>
                  </div>
                  
                  <p className="text-sm text-grey-500 mt-3">
                    PDF files • Up to 5 invoices for demo
                  </p>
                </div>

                <input
                  id="demo-file-upload"
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-grey-900">Create RTPs</h4>
              <p className="text-xs text-grey-600">Intelligent automation</p>
            </div>
          </div>
        </div>
      )}

      {/* Skip option - only show in real mode without upload */}
      {uploadMode === 'real' && !uploadedFile && (
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 No report yet?</strong> No worries—skip this step and return later. We recommend uploading when available.
          </p>
        </div>
      )}
    </div>
  );
}
