
import React from 'react';
import { Eye } from 'lucide-react';
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
    return (
      <div className="flex items-center">
        <ValidationProgressIndicator />
      </div>
    );
  }

  if (portalUser.status === 'Connected') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-green-600">✓ Validated</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-auto"
          onClick={handleInsightsClick}
        >
          <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
        </Button>
      </div>
    );
  }

  return (
    <span className="text-sm text-gray-500">—</span>
  );
}
