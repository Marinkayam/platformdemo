
import React from 'react';
import { OtherIntegration } from './types';
import { getStatusColor } from './utils';

interface OtherIntegrationsListProps {
  integrations: OtherIntegration[];
}

export function OtherIntegrationsList({ integrations }: OtherIntegrationsListProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Other Integrations</h3>
        <p className="text-sm text-gray-600">Additional integration options</p>
      </div>
      <div className="p-4 space-y-3">
        {integrations.map((integration, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <integration.icon className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-medium text-gray-900">{integration.name}</div>
                <div className="text-xs text-gray-500">{integration.type}</div>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
              {integration.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
