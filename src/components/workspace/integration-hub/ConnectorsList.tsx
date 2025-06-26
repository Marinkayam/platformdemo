
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
    <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Active Connectors</h3>
        <p className="text-sm text-gray-600">Configure and manage your email-based integrations</p>
      </div>
      <div className="divide-y divide-gray-100">
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
