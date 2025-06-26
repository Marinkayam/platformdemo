
import React, { useCallback } from 'react';
import { Upload, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-grey-900 mb-2">
          Help Monto understand what's paid—so we can focus on what matters!
        </h3>
        <p className="text-grey-600 mb-4">
          You can upload your ERP's Payment or AR report in Monto's format to help us do the heavy lifting for you. 
          It includes both required and optional fields—we'll guide you through what's needed.
        </p>
        
        <div className="bg-white border border-grey-300 rounded-lg p-4">
          <h4 className="font-semibold text-grey-900 mb-2">Why upload?</h4>
          <p className="text-sm text-grey-600 mb-3">By sharing your report, Monto can:</p>
          <ul className="text-sm text-grey-600 space-y-1 list-disc list-inside">
            <li>Automatically identify payment relationships hidden in your invoice data</li>
            <li>Spot which invoices are already paid (so we don't track what's settled)</li>
            <li>Focus only on open invoices that actually need monitoring</li>
            <li>Create smart RTPs for your open invoices—and keep them updated with live portal data</li>
          </ul>
        </div>
        
        <p className="text-sm text-grey-500 mt-4">
          No report to share yet? No worries—you can skip this step and come back later. 
          But for a smoother, more powerful experience, we recommend uploading it when you can.
        </p>
      </div>

      <div
        className="border-2 border-dashed border-grey-400 rounded-lg p-8 text-center hover:border-primary-main transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <Upload className="w-12 h-12 text-grey-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-grey-900 mb-2">
          Drop your payment report here
        </h3>
        <p className="text-grey-600 mb-4">
          Upload your .csv or .xlsx ERP payment/AR report
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" asChild>
            <label className="cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              Choose File
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>
    </div>
  );
}
