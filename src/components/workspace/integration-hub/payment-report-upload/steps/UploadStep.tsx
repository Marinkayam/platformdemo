
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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-grey-900">Upload Payment Report</h2>
          <p className="text-grey-600 text-lg leading-relaxed max-w-lg mx-auto">
            Transform your ERP payment data into intelligent insights
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="relative">
        <Card className="border-2 border-dashed border-grey-400 hover:border-primary/60 transition-all duration-300 group hover:shadow-lg">
          <CardContent 
            className="p-12 text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-grey-100 group-hover:bg-primary/5 rounded-2xl transition-colors duration-300">
                <Upload className="w-10 h-10 text-grey-500 group-hover:text-primary transition-colors duration-300" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-grey-900">
                  Drop your file here or browse
                </h3>
                <p className="text-grey-500">
                  CSV and Excel files up to 10MB
                </p>
              </div>

              <Button size="lg" variant="outline" className="px-8" asChild>
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

        {/* Template Download */}
        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2">
            <Download className="w-4 h-4" />
            Download Template
          </Button>
          <p className="text-sm text-grey-500 mt-2">
            Need help formatting your data? Use our template
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-success-main/10 rounded-xl">
            <Zap className="w-6 h-6 text-success-main" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-grey-900">Auto-Match Payments</h4>
            <p className="text-sm text-grey-600 leading-relaxed">
              Automatically identify payment relationships in your data
            </p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-warning-main/10 rounded-xl">
            <Clock className="w-6 h-6 text-warning-main" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-grey-900">Skip Paid Invoices</h4>
            <p className="text-sm text-grey-600 leading-relaxed">
              No need to track invoices that are already settled
            </p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-grey-900">Smart RTPs</h4>
            <p className="text-sm text-grey-600 leading-relaxed">
              Create intelligent RTPs for open invoices automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
