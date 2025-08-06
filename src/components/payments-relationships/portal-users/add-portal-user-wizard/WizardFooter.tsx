
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import { WizardStep, UserType } from './types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WizardFooterProps {
  currentStep: WizardStep;
  selectedPortal: string;
  selectedUserType: UserType | null;
  formData?: any;
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  onBulkUpload?: () => void;
}

export function WizardFooter({ currentStep, selectedPortal, selectedUserType, formData, onBack, onNext, onClose, onSubmit, isSubmitting = false, onBulkUpload }: WizardFooterProps) {
  
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
    <TooltipProvider>
      <div className="flex justify-between pt-4">
        <div className="flex gap-2">
          {currentStep === 'portal' && onBulkUpload && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={onBulkUpload} 
                  className="flex items-center gap-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-white transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Upload Bulk CSV File
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs p-3">
                <p className="text-xs leading-relaxed">
                  Upload multiple scan agents at once using a CSV file. 
                  We'll guide you through mapping and validation.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
          {currentStep !== 'portal' && (
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </div>
      <div className="flex gap-2 ml-auto">
        {/* Only show cancel button for setup step when userType is dedicated */}
        {currentStep === 'setup' && selectedUserType === 'dedicated' && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        {currentStep === 'setup' ? (
          <Button onClick={onSubmit} disabled={isSubmitDisabled() || isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Scan Agent"}
          </Button>
        ) : (
          <Button onClick={onNext} disabled={isNextDisabled()}>
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
    </TooltipProvider>
  );
}
