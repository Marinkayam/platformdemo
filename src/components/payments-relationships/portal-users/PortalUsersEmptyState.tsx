
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

interface PortalUsersEmptyStateProps {
  onAddPortalUser: () => void;
}

export function PortalUsersEmptyState({ onAddPortalUser }: PortalUsersEmptyStateProps) {
  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      <CardContent className="text-center p-8">
        <div className="w-16 h-16 rounded-full bg-grey-300 flex items-center justify-center mx-auto mb-4">
          <Building className="h-8 w-8 text-grey-400" />
        </div>
        <h3 className="text-lg font-semibold text-grey-900 mb-2">
          No portal users added yet
        </h3>
        <p className="text-grey-600 mb-6">
          Add a portal login to start building your Smart Connections.
        </p>
        <Button onClick={onAddPortalUser} className="w-full">
          + Add Portal User
        </Button>
      </CardContent>
    </Card>
  );
}
