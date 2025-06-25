
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { UserRow } from './UserRow';

interface PortalRowGroupProps {
  users: PortalUser[];
  isExpanded: boolean;
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
  copyToClipboard: (text: string) => void;
  onUserClick: (user: PortalUser) => void;
}

export function PortalRowGroup({ 
  users, 
  isExpanded, 
  onEdit, 
  onRemove, 
  onView2FA, 
  copyToClipboard,
  onUserClick 
}: PortalRowGroupProps) {
  return (
    <div 
      className={`user-rows overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      {users.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onEdit={onEdit}
          onRemove={onRemove}
          onView2FA={onView2FA}
          copyToClipboard={copyToClipboard}
          onClick={() => onUserClick(user)}
        />
      ))}
    </div>
  );
}
