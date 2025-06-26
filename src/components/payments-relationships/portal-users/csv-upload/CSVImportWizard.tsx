
import React, { useState } from 'react';
import { PortalUser } from '@/types/portalUser';
import { UploadStep } from './UploadStep';
import { MappingStep } from './MappingStep';
import { ReviewStep } from './ReviewStep';
import { SummaryStep } from './SummaryStep';
import { ConnectionProgressStep } from '../add-portal-user-wizard/ConnectionProgressStep';
import { WizardProgress } from './components/WizardProgress';
import { WizardNavigation } from './components/WizardNavigation';
import { useFileParser } from './hooks/useFileParser';
import { useDataValidation } from './hooks/useDataValidation';
import { WizardStepId } from './types';

export { MONTO_FIELDS, type ValidatedUser } from './constants';

export function CSVImportWizard({ onComplete, onImport }: { onComplete: () => void; onImport: (users: Partial<PortalUser>[]) => void }) {
  const [currentStep, setCurrentStep] = useState<WizardStepId>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [mappings, setMappings] = useState<{ [key: string]: string }>({});
  
  const { headers, data, parseFile } = useFileParser();
  const { validatedData, setValidatedData, validateData } = useDataValidation();

  const handleNext = async () => {
    if (currentStep === 'upload' && file) {
      await parseFile(file);
      setCurrentStep('mapping');
    } else if (currentStep === 'mapping') {
      validateData(data, mappings);
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      setCurrentStep('summary');
    }
  };

  const handleBack = () => {
    if (currentStep === 'mapping') setCurrentStep('upload');
    if (currentStep === 'review') setCurrentStep('mapping');
    if (currentStep === 'summary') setCurrentStep('review');
  };
  
  const handleImport = () => {
    setCurrentStep('connecting');
  };

  const handleConnectionComplete = () => {
    const usersToImport = validatedData
        .filter(user => user._status !== 'error')
        .map(({ _row, _errors, _warnings, _status, ...user }) => user);
    
    onImport(usersToImport);
    onComplete();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'upload':
        return <UploadStep onFileSelect={setFile} selectedFile={file} />;
      case 'mapping':
        return <MappingStep headers={headers} data={data} onMappingChange={setMappings} />;
      case 'review':
        return <ReviewStep data={validatedData} onDataChange={setValidatedData} />;
      case 'summary':
        return <SummaryStep data={validatedData} />;
      case 'connecting':
        return <ConnectionProgressStep 
          selectedPortal="Multiple Portals"
          onConnectionComplete={handleConnectionComplete}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <WizardProgress currentStep={currentStep} />
      
      <div>
        {renderStepContent()}
      </div>

      <WizardNavigation
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        onImport={handleImport}
        onComplete={onComplete}
        file={file}
        mappings={mappings}
      />
    </div>
  );
}
