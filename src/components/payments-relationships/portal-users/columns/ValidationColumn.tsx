
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { ValidationProgressIndicator } from '../ValidationProgressIndicator';
import { getValidationSteps } from '../utils';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ValidationColumnProps {
  portalUser: PortalUser;
}

export function ValidationColumn({ portalUser }: ValidationColumnProps) {
  const handleFetchedInsights = () => {
    console.log('Fetched Insights clicked for user:', portalUser.id);
    // TODO: Implement insights fetching logic
  };

  if (portalUser.status === 'Connected') {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFetchedInsights}
          className="h-8 px-3 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        >
          <Sparkles className="h-4 w-4 mr-1.5" />
          Fetched Insights
        </Button>
      </div>
    );
  }

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
