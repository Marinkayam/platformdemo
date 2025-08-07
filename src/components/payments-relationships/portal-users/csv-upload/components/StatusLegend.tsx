import React from 'react';
import { Badge } from '@/components/ui/badge';

export function StatusLegend() {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">Status Guide</h4>
      <div className="space-y-3 text-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
              style={{ color: '#007737', backgroundColor: '#E6F4EA', fontSize: '12px' }}
            >
              New
            </span>
          </div>
          <div className="text-gray-600 flex-1 ml-4">New user. Will be created.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
              style={{ color: '#9CA3AF', backgroundColor: '#F3F4F6', fontSize: '12px' }}
            >
              Exist
            </span>
          </div>
          <div className="text-gray-600 flex-1 ml-4">User exists. Will be ignored.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
              style={{ color: '#1750FB', backgroundColor: '#E3F2FD', fontSize: '12px' }}
            >
              Update
            </span>
          </div>
          <div className="text-gray-600 flex-1 ml-4">Will update existing credentials or URL.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
              style={{ color: '#DF1C41', backgroundColor: '#FFEBEE', fontSize: '12px' }}
            >
              Invalid
            </span>
          </div>
          <div className="text-gray-600 flex-1 ml-4">Missing required fields or invalid formats.</div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
              style={{ color: '#F2AE40', backgroundColor: '#FFF8E1', fontSize: '12px' }}
            >
              Warning
            </span>
          </div>
          <div className="text-gray-600 flex-1 ml-4">Portal not recognized. User must confirm or skip.</div>
        </div>
      </div>
    </div>
  );
}