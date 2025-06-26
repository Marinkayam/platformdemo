
import React from 'react';
import { Eye, Edit2, Settings, Play, Pause, Check, Clock, AlertCircle } from 'lucide-react';
import { EmailConnector } from './types';
import { getStatusColor } from './utils';

interface ConnectorCardProps {
  connector: EmailConnector;
  onView: (connector: EmailConnector) => void;
  onStatusChange: (connectorId: number, newStatus: string) => void;
}

export function ConnectorCard({ connector, onView, onStatusChange }: ConnectorCardProps) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
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
            onClick={() => onView(connector)}
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
            onClick={() => onStatusChange(connector.id, connector.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
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
  );
}
