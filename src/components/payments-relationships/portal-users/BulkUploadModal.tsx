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
      <div className="px-6 pb-6">
        <div>
          <p className="text-sm text-gray-600">
            Upload a CSV file with multiple scan agents to add them all at once. We'll guide you through mapping and validation.
          </p>
        </div>
        <div className="mt-6">
          <CSVImportWizard 
            onComplete={onClose}
            onImport={onImport}
          />
        </div>
      </div>
    </div>
  );
}