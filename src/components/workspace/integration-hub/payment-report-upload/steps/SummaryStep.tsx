
import React from 'react';
import { ValidatedPaymentRecord } from '../types';
import { CheckCircle, AlertTriangle, FileText, TrendingUp } from 'lucide-react';

interface SummaryStepProps {
  validatedData: ValidatedPaymentRecord[];
}

export function SummaryStep({ validatedData }: SummaryStepProps) {
  const validRecords = validatedData.filter(record => record._status === 'valid');
  const warningRecords = validatedData.filter(record => record._status === 'warning');
  const errorRecords = validatedData.filter(record => record._status === 'error');
  
  const statusBreakdown = validRecords.reduce((acc, record) => {
    const status = record.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-grey-900">Ready to Import</h3>
          <p className="text-grey-600">
            Your payment data has been processed and is ready for import
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-grey-900">Import Summary</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-grey-200">
              <span className="text-grey-600">Total Records:</span>
              <span className="font-medium">{validatedData.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-grey-200">
              <span className="text-grey-600">Ready to Import:</span>
              <span className="font-medium text-success-main">{validRecords.length}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-grey-600">Need Attention:</span>
              <span className="font-medium text-red-600">
                {validatedData.length - validRecords.length}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3 text-sm">
            {Object.entries(statusBreakdown).map(([status, count]) => (
              <div key={status} className="flex justify-between py-2 border-b border-grey-200">
                <span className="text-grey-600 capitalize">{status}:</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-3">
            <h4 className="font-semibold text-grey-900">What happens after import?</h4>
            <ul className="text-sm text-grey-600 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Payment records will be added to your workspace</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Smart RTPs will be created for open invoices</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Payment relationships will be tracked automatically</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
