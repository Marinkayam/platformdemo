
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
      {/* Benefits Icons - Now at the top */}
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

      {/* Header - Now smaller */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-grey-900">Upload Payment Report</h3>
          <p className="text-sm text-grey-600 max-w-md mx-auto">
            Transform your ERP payment data into intelligent insights
          </p>
        </div>
      </div>

      {/* Upload Zone - More compact */}
      <div className="space-y-4">
        <Card className="border-2 border-dashed border-grey-300 hover:border-primary/50 transition-all duration-200 group">
          <CardContent 
            className="p-8 text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-grey-50 group-hover:bg-primary/5 rounded-xl transition-colors duration-200">
                <Upload className="w-6 h-6 text-grey-400 group-hover:text-primary transition-colors duration-200" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-base font-medium text-grey-900">
                  Drop your file here or browse
                </h4>
                <p className="text-sm text-grey-500">
                  CSV and Excel files up to 10MB
                </p>
              </div>

              <Button size="default" variant="outline" className="px-6" asChild>
                <label className="cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Template Download - Under upload section */}
        <div className="text-center">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2">
            <Download className="w-4 h-4" />
            Download Template
          </Button>
          <p className="text-xs text-grey-500 mt-1">
            Need help formatting your data? Use our template
          </p>
        </div>
      </div>
    </div>
  );
}
