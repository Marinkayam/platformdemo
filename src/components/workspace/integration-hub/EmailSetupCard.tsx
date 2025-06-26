
import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

export function EmailSetupCard() {
  return (
    <div className="border border-grey-400 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-5 h-5 text-primary-main" />
        <h3 className="text-lg font-semibold text-grey-900">Email Integration Setup</h3>
      </div>
      <p className="text-sm text-grey-600 mb-4">
        Send invoices and documents directly to these dedicated email addresses for automatic processing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg border border-primary-main">
          <div className="text-xs font-medium text-primary-main uppercase tracking-wide mb-1">Invoices</div>
          <div className="font-mono text-sm text-grey-900 flex items-center gap-2">
            microsoft@montoinvoice.com
            <button className="text-primary-main hover:text-primary-dark">
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-primary-main">
          <div className="text-xs font-medium text-primary-main uppercase tracking-wide mb-1">Reports</div>
          <div className="font-mono text-sm text-grey-900 flex items-center gap-2">
            microsoft-reports@montoinvoice.com
            <button className="text-primary-main hover:text-primary-dark">
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
