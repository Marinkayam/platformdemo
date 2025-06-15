
import React, { useState } from 'react';
import { ValidatedUser } from './CSVImportWizard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewStepProps {
  data: ValidatedUser[];
  onDataChange: (data: ValidatedUser[]) => void;
}

type Filter = 'all' | 'valid' | 'error';

export function ReviewStep({ data, onDataChange }: ReviewStepProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const getStatusIcon = (status: ValidatedUser['_status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const filteredData = data.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'valid') return d._status === 'valid';
    if (filter === 'error') return d._status === 'error' || d._status === 'warning';
    return true;
  });

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Review Data</h3>
        <p className="text-sm text-gray-600">Review your data before importing. Rows with errors will be skipped.</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All ({data.length})</Button>
            <Button variant={filter === 'valid' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('valid')}>Valid ({data.filter(d => d._status === 'valid').length})</Button>
            <Button variant={filter === 'error' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('error')}>Errors ({data.filter(d => d._status !== 'valid').length})</Button>
          </div>
          {/* Batch fix tools could go here */}
        </div>

        <div className="border rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Portal</TableHead>
                <TableHead>Username</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(user => (
                <TableRow key={user._row}>
                  <TableCell className="text-gray-500">{user._row}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>{getStatusIcon(user._status)}</TooltipTrigger>
                      <TooltipContent>
                        {user._status === 'valid' && '✅ All good! Ready to import.'}
                        {user._status === 'warning' && (
                          <div className="p-1">
                            <p className="font-medium text-yellow-600">Warnings (row will be imported):</p>
                            <ul className="list-disc list-inside text-sm">
                              {user._warnings.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                          </div>
                        )}
                        {user._status === 'error' && (
                           <div className="p-1">
                            <p className="font-medium text-red-600">Errors (row will be skipped):</p>
                            <ul className="list-disc list-inside text-sm">
                              {user._errors.map((e, i) => <li key={i}>{e}</li>)}
                            </ul>
                          </div>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{user.portal || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                  <TableCell>{user.username || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
