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
      <DialogContent className="w-[900px] max-w-[95vw] h-[80vh] md:h-[620px] max-h-[90vh] p-0 overflow-hidden rounded-xl flex flex-col">
        <DialogHeader className="p-8 pb-0 flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-grey-900">
            Bulk Upload Scan Agents
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-8 pt-4 overflow-y-auto flex-1">
          <CSVImportWizard 
            onComplete={onClose}
            onImport={onImport}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}