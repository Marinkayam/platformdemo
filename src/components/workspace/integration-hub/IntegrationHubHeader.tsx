import React from 'react';
import { Upload } from 'lucide-react';

interface IntegrationHubHeaderProps {
  onUploadPaymentReport: () => void;
}

export function IntegrationHubHeader({ onUploadPaymentReport }: IntegrationHubHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Integration Center</h6>
        <p className="text-base text-grey-600">Manage all your data connections and integrations</p>
      </div>
      <button 
        onClick={onUploadPaymentReport}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors font-medium"
      >
        <Upload className="w-4 h-4" />
        Upload ERP Payment Report
      </button>
    </div>
  );
}
