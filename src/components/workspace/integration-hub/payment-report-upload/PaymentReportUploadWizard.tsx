
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
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main mb-4"></div>
            <p className="text-grey-600">Importing payment report...</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload ERP Payment Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <WizardProgress currentStep={currentStep} />
          {renderStep()}
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
      </DialogContent>
    </Dialog>
  );
}
