
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { PortalUser } from '@/types/portalUser';
import { PortalSelectionStep } from './add-portal-user-wizard/PortalSelectionStep';
import { UserTypeStep } from './add-portal-user-wizard/UserTypeStep';
import { ExistingUserSetupStep } from './add-portal-user-wizard/ExistingUserSetupStep';
import { DedicatedUserSetupStep } from './add-portal-user-wizard/DedicatedUserSetupStep';
import { ConnectionProgressStep } from './add-portal-user-wizard/ConnectionProgressStep';
import { WizardFooter } from './add-portal-user-wizard/WizardFooter';
import { WizardStep, UserType, FormData } from './add-portal-user-wizard/types';
import { Upload, Info } from 'lucide-react';
import { BulkUploadModal } from './BulkUploadModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AddPortalUserWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<PortalUser>) => void;
  mode?: 'create' | 'edit';
  portalUser?: PortalUser;
  isEmbedded?: boolean;
}

export function AddPortalUserWizard({ isOpen, onClose, onSave, mode = 'create', portalUser, isEmbedded = false }: AddPortalUserWizardProps) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);

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
    setIsSubmitting(true);
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
    // Process each user from the CSV
    users.forEach(user => {
      onSave({
        ...user,
        status: 'Validating',
        lastUpdated: new Date().toISOString(),
        isReadOnly: false,
      });
    });
    
    toast({
      title: "Import Successful",
      description: `${users.length} scan agents have been imported.`,
    });
    setShowBulkUploadModal(false);
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

  // When embedded, just return the content without Dialog wrapper
  if (isEmbedded) {
    return (
      <div className="px-6 pb-6">
        {showBulkUploadModal ? (
          <BulkUploadModal
            isOpen={true}
            onClose={() => setShowBulkUploadModal(false)}
            onImport={handleBulkImport}
          />
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">
                Add a single scan agent by selecting a portal and configuring access credentials.
              </p>
            </div>
            {renderCurrentStep()}
            
            {currentStep !== 'connecting' && currentStep !== 'success' && (
              <WizardFooter
                currentStep={currentStep}
                selectedPortal={selectedPortal}
                selectedUserType={selectedUserType}
                formData={formData}
                onBack={handleBack}
                onNext={handleNext}
                onClose={handleCloseAttempt}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onBulkUpload={undefined}
              />
            )}
          </div>
        )}
      </div>
    );
  }

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
        <DialogContent className="w-[900px] p-0 overflow-hidden rounded-xl max-w-[90vw] max-h-[80vh]">
          {!showBulkUploadModal && (
            <DialogHeader className="p-8 pb-0">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-xl font-semibold text-grey-900">
                    {currentStep === 'portal' ? 'Add Scan Agent' : 
                     currentStep === 'userType' ? 'Select User Type' : 'Fill User Details'}
                  </DialogTitle>
                  {currentStep === 'portal' && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="h-5 w-5 rounded-full hover:bg-gray-100 flex items-center justify-center">
                          <Info className="h-4 w-4 text-grey-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-sm">
                        <p className="text-xs">
                          <strong>Scan Agents</strong> automatically connect to your supplier portals, 
                          scan for invoices and purchase orders, and keep your records up to date 
                          without any manual effort. They run on Monto's secure infrastructure 24/7.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TooltipProvider>
            </DialogHeader>
          )}
          
          <div className="p-8 pt-4 pb-24 overflow-y-auto">
            {showBulkUploadModal ? (
              <BulkUploadModal
                isOpen={true}
                onClose={() => setShowBulkUploadModal(false)}
                onImport={handleBulkImport}
              />
            ) : (
              <div className="space-y-6">
                {renderCurrentStep()}

                {/* Only show footer if not in connection flow */}
                {currentStep !== 'connecting' && currentStep !== 'success' && (
                  <WizardFooter
                    currentStep={currentStep}
                    selectedPortal={selectedPortal}
                    selectedUserType={selectedUserType}
                    formData={formData}
                    onBack={handleBack}
                    onNext={handleNext}
                    onClose={handleCloseAttempt}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    onBulkUpload={isEmbedded ? undefined : (() => setShowBulkUploadModal(true))}
                  />
                )}
              </div>
            )}
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
