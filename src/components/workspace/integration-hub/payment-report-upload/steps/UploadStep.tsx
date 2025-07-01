
import React, { useCallback } from 'react';
import { FileText, Download, Info } from 'lucide-react';
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
      {/* Header */}
      <div className="text-center space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-grey-900">Upload Payment Report</h3>
          <p className="text-grey-600 mt-1">
            Help Monto focus on what matters by sharing your ERP payment data
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <Card className="border-2 border-dashed border-grey-300 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
        <CardContent 
          className="p-12 text-center"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="space-y-6">
            <div className="mx-auto w-12 h-12 bg-grey-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-grey-500" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-grey-900">
                Drop your file here or browse
              </p>
              <p className="text-sm text-grey-500">
                Supports CSV and Excel files up to 10MB
              </p>
            </div>
            <Button variant="outline" asChild>
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
      <div className="text-center border-t border-grey-200 pt-6">
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>
        <p className="text-xs text-grey-500 mt-1">
          Need help formatting your data? Use our template
        </p>
      </div>

      {/* Benefits */}
      <Card className="border border-grey-200">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-grey-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <h4 className="font-semibold text-grey-900">Why upload your payment report?</h4>
              <ul className="text-sm text-grey-600 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Automatically identify payment relationships in your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Skip tracking invoices that are already paid</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Create smart RTPs for open invoices automatically</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
