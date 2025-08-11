
import React, { useState } from 'react';
import { ValidatedUser } from './CSVImportWizard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface ReviewStepProps {
  data: ValidatedUser[];
  onDataChange: (data: ValidatedUser[]) => void;
}

type Filter = 'all' | 'valid' | 'error';

export function ReviewStep({ data, onDataChange }: ReviewStepProps) {
  const [filter, setFilter] = useState<Filter>('all');

  // Create fake demo data if no data is provided
  const demoData: ValidatedUser[] = data.length > 0 ? data : [
    { _row: 1, portal: 'Coupa', username: 'john.smith@company.com', password: 'password123', _status: 'valid', _errors: [], _warnings: [] },
    { _row: 2, portal: 'SAP Ariba', username: 'sarah.jones@company.com', password: 'password123', _status: 'valid', _errors: [], _warnings: [] },
    { _row: 3, portal: 'Oracle', username: 'mike.wilson@company.com', password: 'password123', _status: 'error', _errors: ['Invalid email format'], _warnings: [] },
    { _row: 4, portal: 'Workday', username: 'emily.brown@company.com', password: 'password123', _status: 'valid', _errors: [], _warnings: [] },
    { _row: 5, portal: 'Coupa', username: 'david.lee@company.com', password: 'password123', _status: 'warning', _errors: [], _warnings: ['Duplicate user'] },
    { _row: 6, portal: 'SAP Ariba', username: 'lisa.chen@company.com', password: 'password123', _status: 'valid', _errors: [], _warnings: [] },
    { _row: 7, portal: 'Oracle', username: 'james.taylor@company.com', password: 'password123', _status: 'valid', _errors: [], _warnings: [] },
    { _row: 8, portal: 'Workday', username: 'anna.martinez@company.com', password: 'password123', _status: 'error', _errors: ['Portal not found'], _warnings: [] },
    { _row: 9, portal: 'Coupa', username: 'robert.johnson@company.com', password: 'password123', _status: 'valid', _errors: [], _warnings: [] },
    { _row: 10, portal: 'SAP Ariba', username: 'maria.garcia@company.com', password: 'password123', _status: 'valid', _errors: [], _warnings: [] },
  ];

  const displayData = data.length > 0 ? data : demoData;
  const totalRecords = displayData.length;
  const invalidRecords = displayData.filter(d => d._status !== 'valid').length;
  const newRecords = displayData.filter(d => d._status === 'valid').length;

  const filteredData = displayData.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'valid') return d._status === 'valid';
    if (filter === 'error') return d._status === 'error' || d._status === 'warning';
    return true;
  });

  return (
    <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Review Data</h3>
          <p className="text-sm text-gray-600 mt-1">Review your data before importing. Rows with errors will be skipped.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-start">
            <div className="flex items-center gap-1">
              <Button variant="link" size="sm" className={filter === 'all' ? 'text-foreground font-semibold underline' : 'text-muted-foreground hover:underline'} onClick={() => setFilter('all')}>
                All Records {totalRecords}
              </Button>
              <Button variant="link" size="sm" className={filter === 'valid' ? 'text-foreground font-semibold underline' : 'text-muted-foreground hover:underline'} onClick={() => setFilter('valid')}>
                New Records {newRecords}
              </Button>
              <Button variant="link" size="sm" className={filter === 'error' ? 'text-foreground font-semibold underline' : 'text-muted-foreground hover:underline'} onClick={() => setFilter('error')}>
                Errors {invalidRecords}
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
            <Table className="text-xs">
              <TableHeader className="bg-gray-50 sticky top-0 text-xs">
                <TableRow>
                  <TableHead className="px-1.5 py-1 w-10">#</TableHead>
                  <TableHead className="px-1.5 py-1">Portal</TableHead>
                  <TableHead className="px-1.5 py-1">Username</TableHead>
                  <TableHead className="px-1.5 py-1">Password</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map(user => {
                  const isNew = user._status === 'valid';
                  return (
                    <TableRow key={user._row}>
                      <TableCell className="px-1.5 py-1 text-gray-500 w-10">{user._row}</TableCell>
                      <TableCell className={`px-1.5 py-1 ${isNew ? 'underline' : ''}`}>{user.portal || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                      <TableCell className={`px-1.5 py-1 ${isNew ? 'underline' : ''}`}>{user.username || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                      <TableCell className="px-1.5 py-1">****</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
    );
}
