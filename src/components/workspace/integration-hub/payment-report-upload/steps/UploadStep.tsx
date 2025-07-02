
import React, { useCallback } from 'react';
import { Upload, Download, Sparkles, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UploadStepProps {
  onFileUpload: (file: File) => void;
}

export function UploadStep({ onFileUpload }: UploadStepProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - Now at the top */}
      <div className="text-center space-y-2">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-grey-900">Upload Payment Report</h3>
          <p className="text-sm text-grey-600 max-w-md mx-auto">
            Transform your ERP payment data into intelligent insights
          </p>
        </div>
      </div>

      {/* Benefits Icons - Now below header */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-success-main/10 rounded-lg">
            <Zap className="w-4 h-4 text-success-main" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-grey-900">Auto-Match Payments</h4>
            <p className="text-xs text-grey-600 leading-relaxed">
              Automatically identify payment relationships
            </p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-warning-main/10 rounded-lg">
            <Clock className="w-4 h-4 text-warning-main" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-grey-900">Skip Paid Invoices</h4>
            <p className="text-xs text-grey-600 leading-relaxed">
              No need to track settled invoices
            </p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-grey-900">Smart RTPs</h4>
            <p className="text-xs text-grey-600 leading-relaxed">
              Create intelligent RTPs automatically
            </p>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="space-y-6">
        <Card className="border-2 border-dashed border-grey-300 hover:border-primary/50 transition-all duration-200 group">
          <CardContent 
            className="p-8 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-grey-50 group-hover:bg-primary/5 rounded-xl transition-colors duration-200">
                <Upload className="w-6 h-6 text-grey-400 group-hover:text-primary transition-colors duration-200" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-base font-medium text-grey-900">
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
                </h4>
                <p className="text-sm text-grey-500">
                  CSV and Excel files up to 10MB
                </p>
              </div>

              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Template Download - Next to upload */}
        <div className="text-center">
          <p className="text-xs text-grey-500 mb-2">
            Need help formatting your data?
          </p>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2">
            <Download className="w-4 h-4" />
            Download Monto's Payment report template
          </Button>
        </div>

        {/* Skip option */}
        <div className="text-center p-4 bg-grey-50 rounded-lg border">
          <p className="text-sm text-grey-700">
            No report to share yet? No worries—you can skip this step and come back later. But for a smoother, more powerful experience, we recommend uploading it when you can.
          </p>
        </div>

        {/* Alternative option for PDFs - Improved UX */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-grey-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-grey-500">or</span>
          </div>
        </div>

        <Card className="border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-grey-900">
                  Want to see Monto's magic in action?
                </h4>
                <p className="text-sm text-grey-600 max-w-md mx-auto">
                  Upload just a few invoice PDFs and we'll take it from there—Monto will automatically identify payment relationships and show you how it all connects.
                </p>
              </div>

              <Button 
                variant="default" 
                size="default" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf';
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      // Handle PDF files - for now just show a toast
                      console.log('PDF files selected:', files);
                    }
                  };
                  input.click();
                }}
              >
                <Upload className="w-4 h-4" />
                Upload Invoice PDFs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
