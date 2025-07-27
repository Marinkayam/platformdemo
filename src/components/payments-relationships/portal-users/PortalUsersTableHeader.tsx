
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { ChevronUp, ChevronDown } from "lucide-react";

interface PortalUsersTableHeaderProps {
  sortField: keyof PortalUser | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof PortalUser) => void;
}

export function PortalUsersTableHeader({
  sortField,
  sortDirection,
  onSort
}: PortalUsersTableHeaderProps) {
  const renderSortButton = (field: keyof PortalUser, label: string): React.ReactNode => {
    const isActive = sortField === field;
    const IconComponent = isActive && sortDirection === 'desc' ? ChevronDown : ChevronUp;
    
    return (
      <IconComponent 
        className={`h-4 w-4 transition-colors ${
          isActive ? 'text-primary' : 'text-gray-400'
        }`}
      />
    );
  };

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-4 bg-[#F6F7F9] border-b">
      <div 
        className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded"
        onClick={() => onSort('portal')}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">Portal</span>
          {renderSortButton('portal', 'Portal')}
        </div>
      </div>
      <div 
        className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded"
        onClick={() => onSort('username')}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">Username</span>
          {renderSortButton('username', 'Username')}
        </div>
      </div>
      <div 
        className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded"
        onClick={() => onSort('status')}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">Status</span>
          {renderSortButton('status', 'Status')}
        </div>
      </div>
      <div 
        className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded"
        onClick={() => onSort('userType')}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">User Type</span>
          {renderSortButton('userType', 'User Type')}
        </div>
      </div>
      <div className="text-center font-medium text-gray-900 p-2">Actions</div>
    </div>
  );
}
