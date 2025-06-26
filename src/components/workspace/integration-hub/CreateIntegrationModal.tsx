
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
            onClick={onClose}
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
  );
}
