
import React from 'react';
import { ValidatedUser } from './CSVImportWizard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, SkipForward } from 'lucide-react';

interface SummaryStepProps {
  data: ValidatedUser[];
}

export function SummaryStep({ data }: SummaryStepProps) {
  const stats = {
    total: data.length,
    valid: data.filter(d => d._status === 'valid').length,
    error: data.filter(d => d._status === 'error').length,
    warning: data.filter(d => d._status === 'warning').length,
  };
  const skipped = stats.error + stats.warning;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Summary & Import</h3>
      <p className="text-sm text-gray-600">You are about to import the following users.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Import Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{stats.valid}</p>
              <p className="text-sm text-gray-600">New Users to Import</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <SkipForward className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold">{skipped}</p>
              <p className="text-sm text-gray-600">Rows to be Skipped</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
