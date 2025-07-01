
import React from 'react';
import { ValidatedPaymentRecord } from '../types';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, FileText } from 'lucide-react';

interface ReviewStepProps {
  validatedData: ValidatedPaymentRecord[];
}

export function ReviewStep({ validatedData }: ReviewStepProps) {
  const validRecords = validatedData.filter(record => record._status === 'valid').length;
  const warningRecords = validatedData.filter(record => record._status === 'warning').length;
  const errorRecords = validatedData.filter(record => record._status === 'error').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return <Badge variant="default" className="bg-success-main text-white">Valid</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-warning-main text-white">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-success-main" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning-main" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-grey-900">Review Your Data</h3>
          <p className="text-grey-600">
            Check the processed records and resolve any issues before importing
          </p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-success-main/5 border border-success-main/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-success-main" />
            <span className="text-lg font-bold text-success-main">{validRecords}</span>
          </div>
          <div className="text-sm text-success-main font-medium">Valid Records</div>
        </div>
        <div className="bg-warning-main/5 border border-warning-main/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning-main" />
            <span className="text-lg font-bold text-warning-main">{warningRecords}</span>
          </div>
          <div className="text-sm text-warning-main font-medium">Warnings</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-lg font-bold text-red-600">{errorRecords}</span>
          </div>
          <div className="text-sm text-red-600 font-medium">Errors</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-grey-300 rounded-lg overflow-hidden">
        <div className="bg-grey-100 px-4 py-3 border-b border-grey-300">
          <div className="grid grid-cols-6 gap-4 font-semibold text-grey-900 text-sm">
            <div className="flex items-center gap-2">
              <span>Row</span>
            </div>
            <div>Status</div>
            <div>Invoice Number</div>
            <div>Receivable</div>
            <div>Payable</div>
            <div>Amount</div>
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          <div className="divide-y divide-grey-200">
            {validatedData.slice(0, 50).map((record, index) => (
              <div key={index} className="p-4 hover:bg-grey-50">
                <div className="grid grid-cols-6 gap-4 items-center text-sm">
                  <div className="text-grey-600">#{record._row}</div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record._status)}
                    {getStatusBadge(record._status)}
                  </div>
                  <div className="font-medium text-grey-900">{record.invoiceNumber || 'N/A'}</div>
                  <div className="text-grey-700">{record.receivable || 'N/A'}</div>
                  <div className="text-grey-700">{record.payable || 'N/A'}</div>
                  <div className="font-medium text-grey-900">{record.totalAmount || 'N/A'}</div>
                </div>
                {(record._errors.length > 0 || record._warnings.length > 0) && (
                  <div className="mt-3 space-y-1">
                    {record._errors.map((error, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-red-600">
                        <XCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    ))}
                    {record._warnings.map((warning, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-orange-600">
                        <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {validatedData.length > 50 && (
          <div className="bg-grey-50 px-4 py-3 border-t border-grey-300 text-center text-sm text-grey-600">
            Showing first 50 of {validatedData.length} records
          </div>
        )}
      </div>
    </div>
  );
}
