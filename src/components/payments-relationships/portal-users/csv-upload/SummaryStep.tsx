
import React, { useState } from 'react';
import { ValidatedUser } from './CSVImportWizard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SkippedRowsModal } from './SkippedRowsModal';
import { SummaryStatistics } from './components/SummaryStatistics';

interface SummaryStepProps {
  data: ValidatedUser[];
}

export function SummaryStep({ data }: SummaryStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Demo data representing realistic scenario:
  // User re-uploading CSV with mix of existing and new users
  const totalRecords = 50;
  const newRecords = 12;
  const updatedRecords = 33;
  const imported = newRecords + updatedRecords; // 45 total to process
  const skippedCount = 5; // 4 skipped + 1 invalid
  const skippedRows = data.filter(d => d._status === 'error');

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Ready to Import</h3>
          <p className="text-gray-500 text-sm mt-1">Review your data summary before importing</p>
        </div>
        
        <SummaryStatistics data={data} />

        {skippedCount > 0 && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{skippedCount} rows will be skipped</h4>
                <p className="text-gray-600 text-sm mt-1">These rows contain errors and won't be imported</p>
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

      <SkippedRowsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        skippedRows={skippedRows}
      />
    </TooltipProvider>
  );
}
