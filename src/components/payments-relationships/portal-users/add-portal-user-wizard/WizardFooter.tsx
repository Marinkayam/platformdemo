
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WizardStep, UserType } from './types';

interface WizardFooterProps {
  currentStep: WizardStep;
  selectedPortal: string;
  selectedUserType: UserType | null;
  formData?: any;
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function WizardFooter({ currentStep, selectedPortal, selectedUserType, formData, onBack, onNext, onClose, onSubmit }: WizardFooterProps) {
  
  const isNextDisabled = () => {
    if (currentStep === 'portal') return !selectedPortal;
    if (currentStep === 'userType') return !selectedUserType;
    return false;
  }

  const isSubmitDisabled = () => {
    if (selectedUserType === 'existing') {
      return !formData?.username || !formData?.password;
    }
    return false;
  }

  // Don't render footer during connection flow
  if (currentStep === 'connecting' || currentStep === 'success') {
    return null;
  }

  return (
    <div className="flex justify-between pt-4">
      {currentStep !== 'portal' && (
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}
      <div className="flex gap-2 ml-auto">
        {/* Only show cancel button for setup step when userType is dedicated */}
        {currentStep === 'setup' && selectedUserType === 'dedicated' && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        {currentStep === 'setup' ? (
          <Button onClick={onSubmit} disabled={isSubmitDisabled()}>
            Add Scan Agent
          </Button>
        ) : (
          <Button onClick={onNext} disabled={isNextDisabled()}>
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
