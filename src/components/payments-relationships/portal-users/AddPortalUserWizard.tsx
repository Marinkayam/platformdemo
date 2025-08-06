
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { CSVImportWizard } from './csv-upload/CSVImportWizard';
import { PortalUser } from '@/types/portalUser';
import { PortalSelectionStep } from './add-portal-user-wizard/PortalSelectionStep';
import { UserTypeStep } from './add-portal-user-wizard/UserTypeStep';
import { ExistingUserSetupStep } from './add-portal-user-wizard/ExistingUserSetupStep';
import { DedicatedUserSetupStep } from './add-portal-user-wizard/DedicatedUserSetupStep';
import { ConnectionProgressStep } from './add-portal-user-wizard/ConnectionProgressStep';
import { WizardFooter } from './add-portal-user-wizard/WizardFooter';
import { WizardStep, UserType, FormData } from './add-portal-user-wizard/types';

interface AddPortalUserWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<PortalUser>) => void;
  mode?: 'create' | 'edit';
  portalUser?: PortalUser;
}

export function AddPortalUserWizard({ isOpen, onClose, onSave, mode = 'create', portalUser }: AddPortalUserWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('portal');
  const [selectedPortal, setSelectedPortal] = useState<string>('');
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    enable2FA: false,
    twoFAMethod: undefined,
    phoneNumber: '',
    verificationEmail: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDedicatedUserConfirmed, setIsDedicatedUserConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  const handleNext = () => {
    if (currentStep === 'portal' && selectedPortal) {
      setCurrentStep('userType');
    } else if (currentStep === 'userType' && selectedUserType) {
      setCurrentStep('setup');
    }
  };

  const handleBack = () => {
    if (currentStep === 'userType') {
      setCurrentStep('portal');
    } else if (currentStep === 'setup') {
      setCurrentStep('userType');
    }
  };

  const handleSubmit = () => {
    if (selectedUserType === 'dedicated' && !isDedicatedUserConfirmed) {
      toast({
        variant: "destructive",
        title: "Confirmation Required",
        description: "Please confirm that you've created the dedicated user in your portal.",
      });
      return;
    }

    // Start the connection flow
    setCurrentStep('connecting');
  };

  const handleConnectionComplete = () => {
    // Save the portal user
    onSave({
      portal: selectedPortal,
      username: formData.username,
      userType: selectedUserType === 'dedicated' ? 'Monto' : 'External',
      status: 'Validating',
      linkedSmartConnections: 0,
      lastUpdated: new Date().toISOString(),
      isReadOnly: false,
      twoFAMethod: formData.twoFAMethod,
      phoneNumber: formData.phoneNumber,
      verificationEmail: formData.verificationEmail,
    });

    // Show success toast
    toast({
      title: "Scan Agent Created Successfully!",
      description: `${formData.username} has been added and is now validating.`,
    });

    // Close modal
    onClose();
  };

  const handleBulkImport = (users: Partial<PortalUser>[]) => {
    console.log("Importing users:", users);
    toast({
      title: "Import Successful",
      description: `${users.length} users have been imported.`,
    });
    onClose();
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'portal':
        return <PortalSelectionStep 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPortal={selectedPortal}
          onPortalSelect={setSelectedPortal}
        />;
      case 'userType':
        return <UserTypeStep 
          selectedUserType={selectedUserType}
          onUserTypeSelect={setSelectedUserType}
        />;
      case 'setup':
        return selectedUserType === 'existing' 
          ? <ExistingUserSetupStep 
              selectedPortal={selectedPortal}
              formData={formData}
              setFormData={setFormData}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            /> 
          : <DedicatedUserSetupStep 
              selectedPortal={selectedPortal}
              isDedicatedUserConfirmed={isDedicatedUserConfirmed}
              setIsDedicatedUserConfirmed={setIsDedicatedUserConfirmed}
            />;
      case 'connecting':
      case 'success':
        return <ConnectionProgressStep 
          selectedPortal={selectedPortal}
          onConnectionComplete={handleConnectionComplete}
        />;
      default:
        return null;
    }
  };

  const handleCloseAttempt = () => {
    if (currentStep === 'portal' || currentStep === 'connecting' || currentStep === 'success') {
      onClose();
    } else {
      setShowCloseConfirmation(true);
    }
  };

  const handleConfirmClose = () => {
    setShowCloseConfirmation(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(newOpenState) => {
          if (!newOpenState) {
            handleCloseAttempt();
          }
        }}
      >
        <DialogContent className="w-[772px] p-0 overflow-hidden rounded-xl max-w-none">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold text-grey-900">Add Scan Agent</DialogTitle>
          </DialogHeader>
          
          <div className="p-6 pt-0">
            <div className="space-y-6">
              {renderCurrentStep()}

              {/* Only show footer if not in connection flow */}
              {currentStep !== 'connecting' && currentStep !== 'success' && (
                <WizardFooter
                  currentStep={currentStep}
                  selectedPortal={selectedPortal}
                  selectedUserType={selectedUserType}
                  onBack={handleBack}
                  onNext={handleNext}
                  onClose={handleCloseAttempt}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
      </DialogContent>
    </Dialog>

    {/* Close Confirmation Modal */}
    <Dialog open={showCloseConfirmation} onOpenChange={setShowCloseConfirmation}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">
          You will lose all progress if you close this wizard.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setShowCloseConfirmation(false)}>
            Continue Editing
          </Button>
          <Button variant="destructive" onClick={handleConfirmClose}>
            Close Wizard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
