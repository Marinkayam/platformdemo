import React, { useState } from 'react';
import { AddPortalUserWizard } from './AddPortalUserWizard';
import { BulkUploadModal } from './BulkUploadModal';
import { PortalUser } from '@/types/portalUser';
import { TabsNav } from '@/components/common/TabsNav';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddPortalUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  portalUser?: PortalUser;
  onSave: (portalUser: Partial<PortalUser>) => void;
  onOpenExistingAgent?: (username: string, portal: string) => void;
}

export function AddPortalUserModal({
  isOpen,
  onClose,
  mode,
  portalUser,
  onSave,
  onOpenExistingAgent
}: AddPortalUserModalProps) {
  const [activeTab, setActiveTab] = useState<string>('bulk');
  const [bulkUploadStep, setBulkUploadStep] = useState<string>('upload');
  const [manualWizardStep, setManualWizardStep] = useState<string>('portal');

  if (!isOpen) return null;

  const handleBulkImport = (users: Partial<PortalUser>[]) => {
    users.forEach(user => onSave(user));
  };

  const handleBulkStepChange = (step: string) => {
    setBulkUploadStep(step);
  };

  const handleManualStepChange = (step: string) => {
    setManualWizardStep(step);
  };

  const tabs = [
    { 
      id: 'bulk', 
      label: 'Bulk Upload CSV',
      icon: <Upload className="h-4 w-4" />
    },
    { 
      id: 'manual', 
      label: 'Manual Entry',
      icon: <FileText className="h-4 w-4" />
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Add Scan Agent</h2>
        </div>
        
        {/* Only show tabs when on initial steps */}
        {((activeTab === 'manual' && manualWizardStep === 'portal') || (activeTab === 'bulk' && bulkUploadStep === 'upload')) && (
          <div className="px-6 pt-4">
            <TabsNav 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="horizontal"
            />
          </div>
        )}
        
        <div className="px-0 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'manual' ? (
            <AddPortalUserWizard
              isOpen={true}
              onClose={onClose}
              mode={mode}
              portalUser={portalUser}
              onSave={onSave}
              isEmbedded={true}
              onStepChange={handleManualStepChange}
              onOpenExistingAgent={onOpenExistingAgent}
            />
          ) : (
            <BulkUploadModal
              isOpen={true}
              onClose={onClose}
              onImport={handleBulkImport}
              onStepChange={handleBulkStepChange}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
