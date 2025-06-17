
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { ValidationProgressIndicator } from '../ValidationProgressIndicator';
import { getValidationSteps } from '../utils';

interface ValidationColumnProps {
  portalUser: PortalUser;
}

export function ValidationColumn({ portalUser }: ValidationColumnProps) {
  if (portalUser.status === 'Validating') {
    const { steps, progress, status: validationStatus } = getValidationSteps(portalUser);
    return (
      <div className="w-[90%] min-w-[120px]">
        <ValidationProgressIndicator
          progress={progress}
          status={validationStatus}
          steps={steps}
        />
      </div>
    );
  }
  return null;
}
