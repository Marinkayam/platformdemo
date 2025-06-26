
import React from 'react';
import { ValidatedPaymentRecord } from '../types';

interface SummaryStepProps {
  validatedData: ValidatedPaymentRecord[];
}

export function SummaryStep({ validatedData }: SummaryStepProps) {
  const validRecords = validatedData.filter(record => record._status === 'valid');
  const statusBreakdown = validRecords.reduce((acc, record) => {
    const status = record.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-grey-900 mb-2">Import Summary</h3>
        <p className="text-grey-600">
          Ready to import your payment report data. Review the summary below.
        </p>
      </div>

      <div className="bg-grey-100 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-grey-900 mb-3">Import Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-grey-600">Total Records:</span>
                <span className="font-medium">{validatedData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-600">Valid Records:</span>
                <span className="font-medium text-success-main">{validRecords.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-600">Records with Issues:</span>
                <span className="font-medium text-red-600">
                  {validatedData.length - validRecords.length}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-grey-900 mb-3">Status Breakdown</h4>
            <div className="space-y-2">
              {Object.entries(statusBreakdown).map(([status, count]) => (
                <div key={status} className="flex justify-between">
                  <span className="text-grey-600">{status}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-grey-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-grey-600 space-y-1 list-disc list-inside">
          <li>Payment records will be imported into your Monto workspace</li>
          <li>Smart RTPs will be created for open invoices</li>
          <li>Paid invoices will be marked accordingly to focus on what matters</li>
          <li>You'll be able to track payment relationships in your dashboard</li>
        </ul>
      </div>
    </div>
  );
}
