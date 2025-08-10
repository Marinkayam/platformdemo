import React from 'react';
import { Button } from '@/components/ui/button';
import { CSVImportWizard } from './csv-upload/CSVImportWizard';
import { PortalUser } from '@/types/portalUser';
import { X } from 'lucide-react';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (users: Partial<PortalUser>[]) => void;
}

export function BulkUploadModal({ isOpen, onClose, onImport }: BulkUploadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="w-full">
      <div className="px-6 sm:px-8 lg:px-10 pt-4 pb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-grey-900">Bulk Upload Scan Agents</h2>
      </div>
      <div className="p-6 sm:p-8 lg:p-10 pt-0">
        <CSVImportWizard 
          onComplete={onClose}
          onImport={onImport}
        />
      </div>
    </div>
  );
}