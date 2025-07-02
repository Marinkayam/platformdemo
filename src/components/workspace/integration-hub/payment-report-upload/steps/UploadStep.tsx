
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

        {/* Skip option */}
        <div className="text-center p-4 bg-grey-50 rounded-lg border">
          <p className="text-sm text-grey-700 mb-2">
            No report to share yet? No worries—you can skip this step and come back later. But for a smoother, more powerful experience, we recommend uploading it when you can.
          </p>
        </div>

        {/* Alternative option for PDFs */}
        <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-grey-700 mb-2">
            <strong>Want to see Monto's magic in action?</strong>
          </p>
          <p className="text-sm text-grey-600">
            Upload just a few invoice PDFs and we'll take it from there—Monto will automatically identify payment relationships and show you how it all connects.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 border-primary text-primary hover:bg-primary/10"
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
            Upload Invoice PDFs
          </Button>
        </div>

        {/* Payment Report Fields */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-grey-900">Payment Report Fields</h4>
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-3 bg-grey-50 border-b font-medium text-sm text-grey-700">
              <div>Name</div>
              <div>Required</div>
              <div>Example</div>
              <div>Description</div>
            </div>
            <div className="divide-y">
              {[
                { name: 'Invoice Number', required: 'Yes', example: 'INV-123456', description: 'Invoice Number (string)' },
                { name: 'Issue Date', required: 'Yes', example: '15/05/2025', description: 'Invoice Issue Date (date)' },
                { name: 'Due Date', required: 'Yes', example: '15/06/2025', description: "Invoice Due Date. It's Mandatory if no Payment Terms (date)" },
                { name: 'Payment Terms', required: 'Yes', example: 'Net30', description: "Payment Terms. It's Mandatory if no Due Date. (string)" },
                { name: 'Billing Currency', required: 'Yes', example: 'USD', description: 'Invoice Billing Currency. (string)' },
                { name: 'Receivable', required: 'Yes', example: 'Monto LDT', description: 'Supplier Name (string)' },
                { name: 'Payable', required: 'Yes', example: 'Acme INC', description: 'Buyer Name (string)' },
                { name: 'Total Amount', required: 'Yes', example: '15,325', description: 'Invoice Total Amount (number)' },
                { name: 'Total Remaining Amount', required: 'Yes', example: '0', description: "Total Remaining Amount. It's mandatory if no Status. (number)" },
                { name: 'Status', required: 'Yes', example: 'PAID', description: "Invoice Status in ERP. It's mandatory if no Total Remaining Amount.PAID, OPEN, DRAFT, …(string)" },
                { name: 'PO Number', required: 'No', example: 'PO-123456', description: 'Related Purchase Order Number. (string)' },
                { name: 'Tax Total', required: 'No', example: '10', description: 'Tax Total Amount (number)' },
                { name: 'Type', required: 'No', example: 'INVOICE', description: 'INVOICE, CREDITBy default, it is derived from the Total Amount. Total Amount > 0 → INVOICE(string)' },
                { name: 'Transaction ID', required: 'No', example: 'TRN-123456', description: 'Unique transaction ID in ERP (string)' }
              ].map((field, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-3 text-sm">
                  <div className="font-medium text-grey-900">{field.name}</div>
                  <div className={field.required === 'Yes' ? 'text-red-600 font-medium' : 'text-grey-500'}>{field.required}</div>
                  <div className="text-grey-600 font-mono text-xs">{field.example}</div>
                  <div className="text-grey-600 text-xs">{field.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Template Download - Updated text and button */}
        <div className="text-center">
          <p className="text-xs text-grey-500 mb-2">
            Need help formatting your data?
          </p>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2">
            <Download className="w-4 h-4" />
            Download Monto's Payment report template
          </Button>
        </div>
      </div>
    </div>
  );
}
