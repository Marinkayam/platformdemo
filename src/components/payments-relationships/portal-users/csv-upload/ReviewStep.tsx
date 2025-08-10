
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

  const totalRecords = data.length;
  const invalidRecords = data.filter(d => d._status !== 'valid').length;
  const newRecords = data.filter(d => d._status === 'valid').length; // Assuming valid = new for now


  const filteredData = data.filter(d => {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
                All {totalRecords} Records
              </Button>
              <Button variant={filter === 'valid' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('valid')}>
                {newRecords} New Records
              </Button>
              <Button variant={filter === 'error' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('error')}>
                {invalidRecords} Errors
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-gray-50 sticky top-0">
                <TableRow>
                  <TableHead>#</TableHead>
                  
                  <TableHead>Portal</TableHead>
                  <TableHead>Username</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map(user => (
                  <TableRow key={user._row}>
                    <TableCell className="text-gray-500">{user._row}</TableCell>
                    <TableCell>{user.portal || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                    <TableCell>{user.username || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
}
