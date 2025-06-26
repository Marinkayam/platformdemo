import React, { useState } from 'react';
import { 
  Plus, Settings, Eye, Edit2, Play, Pause, Upload, 
  Check, Clock, AlertCircle, Mail, Database, FileText, ExternalLink 
} from 'lucide-react';

interface EmailConnector {
  id: number;
  name: string;
  type: string;
  status: 'ACTIVE' | 'DRAFT' | 'INACTIVE';
  emailTo: string;
  category: string;
  lastModified: string;
}

interface OtherIntegration {
  name: string;
  type: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
}

const emailConnectors: EmailConnector[] = [
  {
    id: 1,
    name: 'Single Invoice (PDF)',
    type: 'SINGLE_INVOICE',
    status: 'DRAFT',
    emailTo: 'microsoft@montoinvoice.com',
    category: 'Email-Based',
    lastModified: '2025-01-15'
  },
  {
    id: 2,
    name: 'Bulk Invoice Processing',
    type: 'BULK_INVOICE',
    status: 'ACTIVE',
    emailTo: 'microsoft@montoinvoice.com',
    category: 'Email-Based',
    lastModified: '2025-01-14'
  },
  {
    id: 3,
    name: 'Purchase Order Sync',
    type: 'PURCHASE_ORDER',
    status: 'INACTIVE',
    emailTo: 'microsoft@montoinvoice.com',
    category: 'Email-Based',
    lastModified: '2025-01-13'
  }
];

const otherIntegrations: OtherIntegration[] = [
  { name: 'NetSuite API', type: 'API', status: 'Coming Soon', icon: Database },
  { name: 'SAP Integration', type: 'ERP', status: 'Coming Soon', icon: Database },
  { name: 'QuickBooks Sync', type: 'ACCOUNTING', status: 'Coming Soon', icon: FileText },
  { name: 'Slack Notifications', type: 'MESSAGING', status: 'Coming Soon', icon: ExternalLink }
];

export function IntegrationHub() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<EmailConnector | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'DRAFT': return 'bg-yellow-100 text-yellow-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'Coming Soon': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (connectorId: number, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Changing connector ${connectorId} status to ${newStatus}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Integration Hub</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all your data connections and integrations</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Integration
        </button>
      </div>

      {/* Quick Setup Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Email Integration Setup</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Send invoices and documents directly to these dedicated email addresses for automatic processing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-blue-200">
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Invoices</div>
            <div className="font-mono text-sm text-gray-900 flex items-center gap-2">
              microsoft@montoinvoice.com
              <button className="text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-blue-200">
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Reports</div>
            <div className="font-mono text-sm text-gray-900 flex items-center gap-2">
              microsoft-reports@montoinvoice.com
              <button className="text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Connectors */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Active Connectors</h3>
            <p className="text-sm text-gray-600">Configure and manage your email-based integrations</p>
          </div>
          <div className="divide-y divide-gray-100">
            {emailConnectors.map((connector) => (
              <div key={connector.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{connector.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(connector.status)}`}>
                        {connector.status === 'ACTIVE' && <Check className="w-3 h-3 mr-1" />}
                        {connector.status === 'DRAFT' && <Clock className="w-3 h-3 mr-1" />}
                        {connector.status === 'INACTIVE' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {connector.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span>Email: {connector.emailTo}</span>
                        <span>Type: {connector.type}</span>
                        <span>Modified: {connector.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setSelectedConnector(connector)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                      title="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleStatusChange(connector.id, connector.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                      className={`p-2 rounded-md hover:bg-gray-100 ${
                        connector.status === 'ACTIVE' ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title={connector.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                    >
                      {connector.status === 'ACTIVE' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Integrations */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Other Integrations</h3>
            <p className="text-sm text-gray-600">Additional integration options</p>
          </div>
          <div className="p-4 space-y-3">
            {otherIntegrations.map((integration, index) => (
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
      </div>

      {/* Create Integration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Integration</h2>
              <p className="text-sm text-gray-600 mt-1">Set up a new data connection or integration</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-3">Integration Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="integrationType" value="email" className="mr-3" defaultChecked />
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span>Email-based Integration</span>
                      </div>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="integrationType" value="api" className="mr-3" />
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-green-600" />
                        <span>API Integration</span>
                      </div>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="integrationType" value="file" className="mr-3" />
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-purple-600" />
                        <span>File Upload Integration</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2">Integration Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter integration name..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={3}
                    placeholder="Describe the integration purpose..."
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload configuration files or documents</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Choose Files
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Integration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connector Details Modal */}
      {selectedConnector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{selectedConnector.name}</h2>
              <p className="text-sm text-gray-600 mt-1">Connector details and configuration</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedConnector.status)}`}>
                      {selectedConnector.status}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <div className="text-sm text-gray-900 mt-1">{selectedConnector.type}</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <div className="text-sm text-gray-900 mt-1 font-mono">{selectedConnector.emailTo}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <div className="text-sm text-gray-900 mt-1">{selectedConnector.category}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Modified</label>
                  <div className="text-sm text-gray-900 mt-1">{selectedConnector.lastModified}</div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedConnector(null)}
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
      )}
    </div>
  );
}
