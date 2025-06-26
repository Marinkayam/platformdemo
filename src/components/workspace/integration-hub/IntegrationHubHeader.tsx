
import React from 'react';
import { Plus } from 'lucide-react';

interface IntegrationHubHeaderProps {
  onCreateIntegration: () => void;
}

export function IntegrationHubHeader({ onCreateIntegration }: IntegrationHubHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-grey-900">Integration Hub</h1>
        <p className="text-sm text-grey-600 mt-1">Manage all your data connections and integrations</p>
      </div>
      <button 
        onClick={onCreateIntegration}
        className="bg-primary-main text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
      >
        <Plus className="w-4 h-4" />
        New Integration
      </button>
    </div>
  );
}
