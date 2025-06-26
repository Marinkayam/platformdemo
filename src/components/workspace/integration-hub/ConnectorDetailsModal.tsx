
import React from 'react';
import { EmailConnector } from './types';
import { getStatusColor } from './utils';

interface ConnectorDetailsModalProps {
  connector: EmailConnector | null;
  onClose: () => void;
}

export function ConnectorDetailsModal({ connector, onClose }: ConnectorDetailsModalProps) {
  if (!connector) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{connector.name}</h2>
          <p className="text-sm text-gray-600 mt-1">Connector details and configuration</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(connector.status)}`}>
                  {connector.status}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <div className="text-sm text-gray-900 mt-1">{connector.type}</div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email Address</label>
              <div className="text-sm text-gray-900 mt-1 font-mono">{connector.emailTo}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Category</label>
              <div className="text-sm text-gray-900 mt-1">{connector.category}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Last Modified</label>
              <div className="text-sm text-gray-900 mt-1">{connector.lastModified}</div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Connector
          </button>
        </div>
      </div>
    </div>
  );
}
