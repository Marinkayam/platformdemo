
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
        <p className="text-sm text-grey-600">Additional integration options</p>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between p-3 bg-grey-200 rounded-lg">
          <div className="flex items-center gap-3">
            <img src="/portal-logos/oracle.png" alt="NetSuite" className="w-5 h-5" />
            <div>
              <div className="font-medium text-grey-900 text-sm">NetSuite API</div>
              <div className="text-xs text-grey-500">ERP Integration</div>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-grey-100 text-grey-700 border-grey-300">
            Coming Soon
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-grey-200 rounded-lg">
          <div className="flex items-center gap-3">
            <img src="/portal-logos/sap.png" alt="SAP" className="w-5 h-5" />
            <div>
              <div className="font-medium text-grey-900 text-sm">SAP Integration</div>
              <div className="text-xs text-grey-500">Enterprise Solution</div>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-grey-100 text-grey-700 border-grey-300">
            Coming Soon
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-grey-200 rounded-lg">
          <div className="flex items-center gap-3">
            <img src="/portal-logos/bill.png" alt="QuickBooks" className="w-5 h-5" />
            <div>
              <div className="font-medium text-grey-900 text-sm">QuickBooks</div>
              <div className="text-xs text-grey-500">Accounting Software</div>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-grey-100 text-grey-700 border-grey-300">
            Coming Soon
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-grey-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">#</span>
            </div>
            <div>
              <div className="font-medium text-grey-900 text-sm">Slack</div>
              <div className="text-xs text-grey-500">Team Communication</div>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-grey-100 text-grey-700 border-grey-300">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}
