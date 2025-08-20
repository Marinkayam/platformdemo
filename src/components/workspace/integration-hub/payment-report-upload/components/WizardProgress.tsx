
import React from 'react';
import { PaymentReportWizardStepId } from '../types';
import { WIZARD_STEPS } from '../constants';
import { WizardProgress as UIWizardProgress } from '@/components/ui/wizard-progress';

interface WizardProgressProps {
  currentStep: PaymentReportWizardStepId;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  if (currentStep === 'connecting') {
    return null;
  }

  return <UIWizardProgress steps={WIZARD_STEPS} currentStep={currentStep} />;
}
