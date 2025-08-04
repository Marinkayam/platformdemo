
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UploadStep } from './steps/UploadStep';
import { MappingStep } from './steps/MappingStep';
import { ReviewStep } from './steps/ReviewStep';
import { SummaryStep } from './steps/SummaryStep';
import { WizardProgress } from './components/WizardProgress';
import { WizardNavigation } from './components/WizardNavigation';
import { useFileParser } from './hooks/useFileParser';
import { useDataValidation } from './hooks/useDataValidation';
import { PaymentReportWizardStepId } from './types';
import { Loader2 } from 'lucide-react';

interface PaymentReportUploadWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentReportUploadWizard({ isOpen, onClose }: PaymentReportUploadWizardProps) {
  const [currentStep, setCurrentStep] = useState<PaymentReportWizardStepId>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [mappings, setMappings] = useState<{ [key: string]: string }>({});
  
  const { headers, data, parseFile } = useFileParser();
  const { validatedData, validateData } = useDataValidation();

  const handleNext = () => {
    const steps: PaymentReportWizardStepId[] = ['upload', 'mapping', 'review', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      if (currentStep === 'mapping') {
        validateData(data, mappings);
      }
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: PaymentReportWizardStepId[] = ['upload', 'mapping', 'review', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    await parseFile(uploadedFile);
    handleNext();
  };

  const handleImport = () => {
    setCurrentStep('connecting');
    // Simulate import process
    setTimeout(() => {
      onClose();
      // Reset state
      setCurrentStep('upload');
      setFile(null);
      setMappings({});
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <UploadStep onFileUpload={handleFileUpload} />;
      case 'mapping':
        return (
          <MappingStep
            headers={headers}
            data={data}
            mappings={mappings}
            onMappingChange={setMappings}
          />
        );
      case 'review':
        return <ReviewStep validatedData={validatedData} />;
      case 'summary':
        return <SummaryStep validatedData={validatedData} />;
      case 'connecting':
        return (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-grey-600 font-medium">Importing payment report...</p>
            <p className="text-sm text-grey-500">This may take a few moments</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
        <DialogHeader className="pb-4 flex-shrink-0">
          <DialogTitle className="text-lg">Upload ERP Payment Report</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col min-h-0">
          {currentStep !== 'connecting' && (
            <div className="flex-shrink-0 pb-4">
              <WizardProgress currentStep={currentStep} />
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            {renderStep()}
          </div>
          <div className="flex-shrink-0 mt-4">
            <WizardNavigation
              currentStep={currentStep}
              onBack={handleBack}
              onNext={handleNext}
              onImport={handleImport}
              onComplete={onClose}
              file={file}
              mappings={mappings}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
