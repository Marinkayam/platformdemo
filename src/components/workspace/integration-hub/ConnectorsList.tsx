
import React from 'react';
import { EmailConnector } from './types';

interface ConnectorsListProps {
  connectors: EmailConnector[];
  onView: (connector: EmailConnector) => void;
  onStatusChange: (connectorId: number, newStatus: string) => void;
}

export function ConnectorsList({ connectors, onView, onStatusChange }: ConnectorsListProps) {
  return (
    <div className="lg:col-span-3 bg-white rounded-lg border border-grey-400">
      <div className="p-4 border-b border-grey-400">
        <h3 className="text-base font-semibold text-grey-900">Connectors</h3>
        <p className="text-sm text-grey-600">Configure and manage your email-based integrations</p>
      </div>
      <div className="p-4">
        <div className="text-center py-20 text-grey-500">
          Email connector management coming soon...
        </div>
      </div>
    </div>
  );
}
