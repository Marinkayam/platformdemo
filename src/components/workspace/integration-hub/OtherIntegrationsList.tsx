
import React from 'react';
import { OtherIntegration } from './types';
import { getStatusColor } from './utils';

interface OtherIntegrationsListProps {
  integrations: OtherIntegration[];
}

export function OtherIntegrationsList({ integrations }: OtherIntegrationsListProps) {
  return (
    <div className="lg:col-span-3 bg-white rounded-lg border border-grey-400">
      <div className="p-4 border-b border-grey-400">
        <h3 className="text-base font-semibold text-grey-900">Connectors</h3>
        <p className="text-sm text-grey-600">Additional integration options</p>
      </div>
      <div className="p-4 space-y-3">
        {integrations.map((integration, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-grey-200 rounded-lg">
            <div className="flex items-center gap-3">
              <integration.icon className="w-5 h-5 text-grey-600" />
              <div>
                <div className="font-medium text-grey-900 text-sm">{integration.name}</div>
                <div className="text-xs text-grey-500">{integration.type}</div>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(integration.status)}`} style={{ backgroundColor: '#EFEBFF' }}>
              {integration.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
