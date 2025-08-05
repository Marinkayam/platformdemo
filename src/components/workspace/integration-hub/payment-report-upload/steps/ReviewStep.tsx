
import React, { useState } from 'react';
import { ValidatedPaymentRecord } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewStepProps {
  validatedData: ValidatedPaymentRecord[];
}

type Filter = 'all' | 'valid' | 'error';

export function ReviewStep({ validatedData }: ReviewStepProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const validRecords = validatedData.filter(record => record._status === 'valid').length;
  const errorRecords = validatedData.filter(record => record._status !== 'valid').length;

  const getStatusIcon = (status: ValidatedPaymentRecord['_status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const filteredData = validatedData.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'valid') return d._status === 'valid';
    if (filter === 'error') return d._status === 'error' || d._status === 'warning';
    return true;
  });

  // Create error preview showing row numbers and X marks for missing/invalid fields
  const getErrorPreview = (record: ValidatedPaymentRecord) => {
    if (record._status === 'valid') return null;
    
    const fields = ['Invoice Number', 'Receivable', 'Payable', 'Amount', 'Date'];
    return (
      <div className="text-xs text-gray-600 mt-1">
        Row {record._row}: {fields.map((field, idx) => {
          const hasError = record._errors.some(error => error.toLowerCase().includes(field.toLowerCase()));
          return hasError ? <span key={idx} className="text-red-500 font-mono mx-1">[X]</span> : 
                           <span key={idx} className="text-green-500 font-mono mx-1">[✓]</span>;
        })}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Review Data</h3>
        <p className="text-sm text-gray-600">Review your data before importing. Rows with errors will be skipped.</p>

        {/* Summary counts */}
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">{validRecords} valid rows</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">{errorRecords} errors found</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
              All ({validatedData.length})
            </Button>
            <Button variant={filter === 'valid' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('valid')}>
              Valid ({validRecords})
            </Button>
            <Button variant={filter === 'error' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('error')}>
              Errors ({errorRecords})
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(record => (
                <TableRow key={record._row}>
                  <TableCell className="text-gray-500">{record._row}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>{getStatusIcon(record._status)}</TooltipTrigger>
                      <TooltipContent>
                        {record._status === 'valid' && '✅ All good! Ready to import.'}
                        {record._status === 'warning' && (
                          <div className="p-1">
                            <p className="font-medium text-yellow-600">Warnings (row will be imported):</p>
                            <ul className="list-disc list-inside text-sm">
                              {record._warnings.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                          </div>
                        )}
                        {record._status === 'error' && (
                          <div className="p-1">
                            <p className="font-medium text-red-600">Errors (row will be skipped):</p>
                            <ul className="list-disc list-inside text-sm">
                              {record._errors.map((e, i) => <li key={i}>{e}</li>)}
                            </ul>
                          </div>
                        )}
                      </TooltipContent>
                    </Tooltip>
                    {getErrorPreview(record)}
                  </TableCell>
                  <TableCell>{record.invoiceNumber || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                  <TableCell>{record.totalAmount || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
