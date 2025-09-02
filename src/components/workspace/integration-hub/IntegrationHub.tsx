
import React from 'react';
import { IntegrationHubHeader } from './IntegrationHubHeader';
import { EmailSetupCard } from './EmailSetupCard';
import { ConnectorsList } from './ConnectorsList';
import { emailConnectors } from './constants';

export function IntegrationHub() {
  return (
    <div className="space-y-6">
      <IntegrationHubHeader />
      <EmailSetupCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ConnectorsList 
          connectors={emailConnectors}
          onView={() => {}}
          onStatusChange={() => {}}
        />
      </div>
    </div>
  );
}
