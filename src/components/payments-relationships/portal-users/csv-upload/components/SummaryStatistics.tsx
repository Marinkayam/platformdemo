import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ValidatedUser } from '../CSVImportWizard';

interface SummaryStatisticsProps {
  data: ValidatedUser[];
}

export function SummaryStatistics({ data }: SummaryStatisticsProps) {
  // Demo data representing a realistic scenario:
  // User uploading 50 records where some already exist in Monto
  const totalRecords = 50;
  const newRecords = 12; // Brand new users to be created
  const updatedRecords = 33; // Existing users with updated info
  const skippedRecords = 4; // Records with errors
  const invalidRecords = 1; // Invalid format records

  const statistics = [
    { 
      name: 'Number of records in CSV', 
      count: totalRecords, 
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    { 
      name: 'Number of new records', 
      count: newRecords, 
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    { 
      name: 'Number of updated records', 
      count: updatedRecords, 
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    { 
      name: 'Number of skipped records', 
      count: skippedRecords, 
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
    { 
      name: 'Number of invalid records', 
      count: invalidRecords, 
      color: 'text-gray-900',
      bgColor: 'bg-white border-gray-200'
    },
  ];

  return (
    <div className="space-y-2">
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
    </div>
  );
}