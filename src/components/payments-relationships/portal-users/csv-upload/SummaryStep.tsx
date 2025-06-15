
import React, { useState } from 'react';
import { ValidatedUser } from './CSVImportWizard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SkippedRowsModal } from './SkippedRowsModal';

interface SummaryStepProps {
  data: ValidatedUser[];
}

export function SummaryStep({ data }: SummaryStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = {
    valid: data.filter(d => d._status === 'valid').length,
    warning: data.filter(d => d._status === 'warning').length,
  };
  const imported = stats.valid + stats.warning;
  const skippedRows = data.filter(d => d._status === 'error');

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Summary & Import</h3>
        <p className="text-sm text-gray-600">You are about to import the following users.</p>
        
        <Card>
          <CardContent className="grid grid-cols-2 gap-4 p-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-2xl font-bold">{imported}</p>
                <p className="text-sm text-gray-600">New Users to Import</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-2xl font-bold">{skippedRows.length}</p>
                <p className="text-sm text-gray-600">Rows to be Skipped</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {skippedRows.length > 0 && (
          <div className="text-center mt-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                  View Skipped Rows
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See rows that were not imported and why</p>
              </TooltipContent>
            </Tooltip>
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
