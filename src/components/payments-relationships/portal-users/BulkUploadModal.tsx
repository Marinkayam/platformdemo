import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[900px] max-w-[95vw] p-0 overflow-hidden rounded-xl">
        <DialogHeader className="px-6 sm:px-8 lg:px-10 pt-6 pb-6 flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-grey-900">
            Bulk Upload Scan Agents
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 sm:p-8 lg:p-10 pt-0">
          <CSVImportWizard 
            onComplete={onClose}
            onImport={onImport}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}