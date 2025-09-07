import React from 'react';
import { Typography } from '@/components/ui/typography/typography';

export function IntegrationHubHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <Typography variant="h5" className="mb-1">Integration Center</Typography>
        <Typography variant="body1" className="text-grey-600">Manage all your data connections and integrations</Typography>
      </div>
    </div>
  );
}
