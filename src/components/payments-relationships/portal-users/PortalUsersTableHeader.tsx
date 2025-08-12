
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

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
  const renderSortButton = (field: keyof PortalUser, label: string) => {
    const isActive = sortField === field;
    const SortIcon = !isActive ? ArrowUpDown : sortDirection === 'asc' ? ArrowUp : ArrowDown;
    
    return (
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-2 hover:text-gray-900 transition-colors text-left"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
      </button>
    );
  };

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-4 bg-[#F6F7F9] border-b">
      <div className="text-sm font-semibold">
        {renderSortButton('portal', 'Portal')}
      </div>
      <div className="text-sm font-semibold">
        {renderSortButton('username', 'Username')}
      </div>
      <div className="text-sm font-semibold">
        {renderSortButton('status', 'Status')}
      </div>
      <div className="text-sm font-semibold">
        {renderSortButton('userType', 'User Type')}
      </div>
      <div className="text-center text-sm font-semibold"></div>
    </div>
  );
}
