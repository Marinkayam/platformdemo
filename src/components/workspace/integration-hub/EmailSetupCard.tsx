
import React from 'react';
import { ExternalLink } from 'lucide-react';

export function EmailSetupCard() {
  return (
    <div className="border border-grey-400 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-grey-900">Email Integration Setup</h3>
      </div>
      <p className="text-sm text-grey-600 mb-4">
        Send invoices and documents directly to these dedicated email addresses for automatic processing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg border border-primary-main">
          <div className="text-xs font-medium text-primary-main uppercase tracking-wide mb-1">Invoices</div>
          <div className="font-mono text-sm text-grey-900">
            microsoft@montoinvoice.com
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-primary-main">
          <div className="text-xs font-medium text-primary-main uppercase tracking-wide mb-1">Reports</div>
          <div className="font-mono text-sm text-grey-900">
            microsoft-reports@montoinvoice.com
          </div>
        </div>
      </div>
    </div>
  );
}
