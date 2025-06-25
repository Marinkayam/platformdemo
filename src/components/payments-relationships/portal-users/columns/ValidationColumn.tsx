
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { ValidationProgressIndicator } from '../ValidationProgressIndicator';
import { getValidationSteps } from '../utils';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface ValidationColumnProps {
  portalUser: PortalUser;
}

export function ValidationColumn({ portalUser }: ValidationColumnProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInsightsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchParams({ tab: 'insights' });
  };

  if (portalUser.status === 'Connected') {
    return (
      <div className="w-[90%] min-w-[120px] flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleInsightsClick}
          className="h-8 px-3 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        >
          <Sparkles className="h-4 w-4 mr-1.5" />
          Insights
        </Button>
      </div>
    );
  }

  if (portalUser.status === 'Validating') {
    const { steps, progress, status: validationStatus } = getValidationSteps(portalUser);
    return (
      <div className="w-[90%] min-w-[120px] flex items-center">
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
