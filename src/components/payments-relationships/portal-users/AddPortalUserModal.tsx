import React from 'react';
import { AddPortalUserWizard } from './AddPortalUserWizard';
import { PortalUser } from '@/types/portalUser';

interface AddPortalUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  portalUser?: PortalUser;
  onSave: (portalUser: Partial<PortalUser>) => void;
}

export function AddPortalUserModal({ 
  isOpen, 
  onClose, 
  mode, 
  portalUser, 
  onSave 
}: AddPortalUserModalProps) {
  return (
    <AddPortalUserWizard
      isOpen={isOpen}
      onClose={onClose}
      mode={mode}
      portalUser={portalUser}
      onSave={onSave}
    />
  );
}
