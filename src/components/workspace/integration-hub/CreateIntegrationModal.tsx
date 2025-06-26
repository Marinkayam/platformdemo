
import React from 'react';
import { Mail, Database, Upload } from 'lucide-react';

interface CreateIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateIntegrationModal({ isOpen, onClose }: CreateIntegrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-grey-400">
          <h2 className="text-xl font-semibold text-grey-900">Create New Integration</h2>
          <p className="text-sm text-grey-600 mt-1">Set up a new data connection or integration</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-grey-900 block mb-3">Integration Type</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="integrationType" value="email" className="mr-3" defaultChecked />
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-main" />
                    <span>Email-based Integration</span>
                  </div>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="integrationType" value="api" className="mr-3" />
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-success-main" />
                    <span>API Integration</span>
                  </div>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="integrationType" value="file" className="mr-3" />
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-monto-purple" />
                    <span>File Upload Integration</span>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-grey-900 block mb-2">Integration Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-grey-400 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                placeholder="Enter integration name..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-grey-900 block mb-2">Description</label>
              <textarea 
                className="w-full px-3 py-2 border border-grey-400 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main resize-none"
                rows={3}
                placeholder="Describe the integration purpose..."
              />
            </div>
            <div className="border-2 border-dashed border-grey-400 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-grey-500 mx-auto mb-2" />
              <p className="text-sm text-grey-600">Upload configuration files or documents</p>
              <button className="mt-2 text-primary-main hover:text-primary-dark text-sm font-medium">
                Choose Files
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-grey-400 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-grey-700 border border-grey-400 rounded-lg hover:bg-grey-200"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark">
            Create Integration
          </button>
        </div>
      </div>
    </div>
  );
}
