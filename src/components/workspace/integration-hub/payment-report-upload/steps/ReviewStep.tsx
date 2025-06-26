
import React from 'react';
import { ValidatedPaymentRecord } from '../types';
import { Badge } from '@/components/ui/badge';

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-grey-900 mb-2">Review Payment Data</h3>
        <p className="text-grey-600">
          Review the parsed payment records before importing. Fix any issues if needed.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-success-main/10 border border-success-main rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success-main">{validRecords}</div>
          <div className="text-sm text-success-main">Valid Records</div>
        </div>
        <div className="bg-warning-main/10 border border-warning-main rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning-main">{warningRecords}</div>
          <div className="text-sm text-warning-main">Warnings</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{errorRecords}</div>
          <div className="text-sm text-red-600">Errors</div>
        </div>
      </div>

      <div className="border border-grey-400 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
        <div className="bg-grey-200 px-4 py-3 border-b border-grey-400 sticky top-0">
          <div className="grid grid-cols-6 gap-4 font-semibold text-grey-900">
            <div>Row</div>
            <div>Status</div>
            <div>Invoice Number</div>
            <div>Receivable</div>
            <div>Payable</div>
            <div>Amount</div>
          </div>
        </div>
        
        <div className="divide-y divide-grey-300">
          {validatedData.slice(0, 100).map((record, index) => (
            <div key={index} className="p-4">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="text-sm text-grey-600">{record._row}</div>
                <div>{getStatusBadge(record._status)}</div>
                <div className="text-sm text-grey-900">{record.invoiceNumber || 'N/A'}</div>
                <div className="text-sm text-grey-900">{record.receivable || 'N/A'}</div>
                <div className="text-sm text-grey-900">{record.payable || 'N/A'}</div>
                <div className="text-sm text-grey-900">{record.totalAmount || 'N/A'}</div>
              </div>
              {(record._errors.length > 0 || record._warnings.length > 0) && (
                <div className="mt-2 space-y-1">
                  {record._errors.map((error, idx) => (
                    <div key={idx} className="text-xs text-red-600">• {error}</div>
                  ))}
                  {record._warnings.map((warning, idx) => (
                    <div key={idx} className="text-xs text-orange-600">• {warning}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
