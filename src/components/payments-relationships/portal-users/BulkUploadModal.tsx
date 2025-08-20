import React from 'react';
import { Button } from '@/components/ui/button';
import { CSVImportWizard } from './csv-upload/CSVImportWizard';
import { PortalUser } from '@/types/portalUser';
import { X } from 'lucide-react';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (users: Partial<PortalUser>[]) => void;
  onStepChange?: (step: string) => void;
}

export function BulkUploadModal({ isOpen, onClose, onImport, onStepChange }: BulkUploadModalProps) {
  const [currentStep, setCurrentStep] = React.useState<string>('upload');

  if (!isOpen) return null;

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    onStepChange?.(step);
  };

  return (
    <div className="w-full">
      <div className="px-6 pb-6">
        {/* Only show description text on the initial upload step */}
        {currentStep === 'upload' && (
          <div>
            <p className="text-sm text-gray-600">
              Upload a CSV file with multiple scan agents to add them all at once. We'll guide you through mapping and validation.
            </p>
          </div>
        )}
        <div className={currentStep === 'upload' ? 'mt-6' : ''}>
          <CSVImportWizard 
            onComplete={onClose}
            onImport={onImport}
            onStepChange={handleStepChange}
          />
        </div>
      </div>
    </div>
  );
}