
import React from 'react';
import Papa from 'papaparse';
import { ValidatedUser } from './CSVImportWizard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { XCircle } from 'lucide-react';

interface SkippedRowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  skippedRows: ValidatedUser[];
}

export function SkippedRowsModal({ isOpen, onClose, skippedRows }: SkippedRowsModalProps) {
  const handleDownload = () => {
    const csvData = skippedRows.map(user => ({
      'Row #': user._row,
      'Portal': user.portal || '',
      'Username': user.username || '',
      'Reason for Skipping': user._errors.join(', '),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'skipped_rows.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="h-6 w-6 text-destructive" />
            Skipped Rows — Review Issues
          </DialogTitle>
          <DialogDescription>
            These rows had errors and were not imported. You can download this list to fix and re-upload.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto border rounded-lg">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50">
              <TableRow>
                <TableHead>Row</TableHead>
                <TableHead>Portal</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skippedRows.map(user => (
                <TableRow key={user._row}>
                  <TableCell>{user._row}</TableCell>
                  <TableCell>{user.portal || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                  <TableCell>{user.username || <span className="text-gray-400 italic">Not provided</span>}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-destructive">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>{user._errors.join(', ')}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end pt-4">
          <Button variant="ghost" size="sm" onClick={handleDownload} className="text-primary hover:bg-transparent underline">
            Download Skipped Rows (.csv)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
