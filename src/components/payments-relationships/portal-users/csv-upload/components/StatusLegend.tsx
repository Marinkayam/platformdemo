import React from 'react';
import { Badge } from '@/components/ui/badge';

export function StatusLegend() {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">Status Guide</h4>
      <div className="space-y-3 text-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 border-green-200">New</Badge>
          </div>
          <div className="text-gray-600 flex-1 ml-4">New user. Will be created.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-gray-100 text-gray-700 border-gray-200">Exist</Badge>
          </div>
          <div className="text-gray-600 flex-1 ml-4">User exists. Will be ignored.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">Update</Badge>
          </div>
          <div className="text-gray-600 flex-1 ml-4">Will update existing credentials or URL.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-red-100 text-red-700 border-red-200">Invalid</Badge>
          </div>
          <div className="text-gray-600 flex-1 ml-4">Missing required fields or invalid formats.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Warning</Badge>
          </div>
          <div className="text-gray-600 flex-1 ml-4">Portal not recognized. User must confirm or skip.</div>
        </div>
      </div>
    </div>
  );
}