
import React from 'react';
import { EmailConnector } from './types';
import { ConnectorCard } from './ConnectorCard';

interface ConnectorsListProps {
  connectors: EmailConnector[];
  onView: (connector: EmailConnector) => void;
  onStatusChange: (connectorId: number, newStatus: string) => void;
}

export function ConnectorsList({ connectors, onView, onStatusChange }: ConnectorsListProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-lg border border-grey-400">
      <div className="p-4 border-b border-grey-400">
        <h3 className="text-lg font-semibold text-grey-900">Active Connectors</h3>
        <p className="text-sm text-grey-600">Configure and manage your email-based integrations</p>
      </div>
      <div className="divide-y divide-grey-300">
        {connectors.map((connector) => (
          <ConnectorCard 
            key={connector.id}
            connector={connector}
            onView={onView}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
