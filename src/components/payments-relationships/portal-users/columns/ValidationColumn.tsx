
import React from 'react';
import { Wand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortalUser } from '@/types/portalUser';
import { ValidationProgressIndicator } from '../ValidationProgressIndicator';
import { toast } from '@/hooks/use-toast';

interface ValidationColumnProps {
  portalUser: PortalUser;
}

export function ValidationColumn({ portalUser }: ValidationColumnProps) {
  const handleInsightsClick = () => {
    toast({
      title: "Coming soon...",
      description: "Insights feature will be available soon.",
    });
  };

  if (portalUser.status === 'Validating') {
    // Mock validation data for the progress indicator
    const mockSteps = [
      { label: 'Portal Connection', status: 'completed' as const },
      { label: 'Credential Verification', status: 'in-progress' as const },
      { label: 'Data Sync', status: 'pending' as const },
    ];
    
    return (
      <div className="flex items-center">
        <ValidationProgressIndicator 
          progress={65}
          status="Validating portal connection..."
          steps={mockSteps}
        />
      </div>
    );
  }

  if (portalUser.status === 'Connected') {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 p-2 h-auto hover:bg-gray-100"
          onClick={handleInsightsClick}
        >
          <Wand className="h-4 w-4 text-black" />
          <span className="text-sm text-black">Insights</span>
        </Button>
      </div>
    );
  }

  return (
    <span className="text-sm text-gray-500">—</span>
  );
}
