
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
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
    <TableHeader className="bg-[#F6F7F9]">
      <TableRow>
        <TableHead 
          className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onSort('portal')}
        >
          <div className="flex items-center justify-between">
            Portal
            {renderSortButton('portal', 'Portal')}
          </div>
        </TableHead>
        <TableHead 
          className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onSort('username')}
        >
          <div className="flex items-center justify-between">
            Username
            {renderSortButton('username', 'Username')}
          </div>
        </TableHead>
        <TableHead 
          className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onSort('status')}
        >
          <div className="flex items-center justify-between">
            Status
            {renderSortButton('status', 'Status')}
          </div>
        </TableHead>
        <TableHead 
          className="whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onSort('userType')}
        >
          <div className="flex items-center justify-between">
            User Type
            {renderSortButton('userType', 'User Type')}
          </div>
        </TableHead>
        <TableHead className="w-16 text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
