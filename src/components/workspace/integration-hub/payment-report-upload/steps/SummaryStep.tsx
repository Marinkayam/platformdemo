
import React, { useState } from 'react';
import { ValidatedPaymentRecord } from '../types';
import { Button } from '@/components/ui/button';

interface SummaryStepProps {
  validatedData: ValidatedPaymentRecord[];
}

export function SummaryStep({ validatedData }: SummaryStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validRecords = validatedData.filter(record => record._status === 'valid');
  const warningRecords = validatedData.filter(record => record._status === 'warning');
  const errorRecords = validatedData.filter(record => record._status === 'error');
  const skippedCount = warningRecords.length + errorRecords.length;

  // Calculate statistics for the payment report
  const totalRecords = validatedData.length;
  const newPayments = validRecords.filter(record => record.status === 'pending').length;
  const matchedPayments = validRecords.filter(record => record.status === 'matched').length;
  const unmatchedPayments = validRecords.filter(record => record.status === 'unmatched').length;

  const statistics = [
    {
      name: 'Number of records in file',
      count: totalRecords,
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    {
      name: 'Number of matched payments',
      count: matchedPayments,
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    {
      name: 'Number of unmatched payments',
      count: unmatchedPayments,
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    {
      name: 'Number of new RTPs to create',
      count: newPayments,
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    {
      name: 'Number of skipped records',
      count: skippedCount,
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Ready to Import</h3>
        <p className="text-gray-500 text-sm mt-1">Review your data summary before importing</p>
      </div>

      {/* Statistics Cards */}
      <div className="space-y-2">
        {statistics.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-md p-3 flex items-center justify-between border text-xs`}>
            <div className="flex-1">
              <p className={`font-medium ${stat.color}`}>{stat.name}</p>
            </div>
            <div className={`text-right ml-3`}>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skipped Records Warning */}
      {skippedCount > 0 && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{skippedCount} rows will be skipped</h4>
              <p className="text-gray-600 text-sm mt-1">These rows contain errors or warnings and won't be imported</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="text-gray-700 hover:bg-gray-100 text-sm"
            >
              View Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
