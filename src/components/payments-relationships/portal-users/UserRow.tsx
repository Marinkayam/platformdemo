
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { UsernameColumn } from './columns/UsernameColumn';
import { UserTypeColumn } from './columns/UserTypeColumn';
import { LinkedAgentsColumn } from './columns/LinkedAgentsColumn';
import { ValidationColumn } from './columns/ValidationColumn';
import { ActionsColumn } from './columns/ActionsColumn';
import { StatusBadge } from '@/components/ui/status-badge';

interface UserRowProps {
  user: PortalUser;
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
  copyToClipboard: (text: string) => void;
  onClick: () => void;
}

export function UserRow({ user, onEdit, onRemove, onView2FA, copyToClipboard, onClick }: UserRowProps) {
  return (
    <div 
      className="user-row grid grid-cols-6 gap-4 px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-center pl-4">
        <div className="w-0.5 h-5 bg-gray-300 rounded-full mr-4"></div>
      </div>
      
      <div className="flex items-center">
        <UsernameColumn username={user.username} onCopy={copyToClipboard} />
      </div>
      
      <div className="flex items-center">
        <StatusBadge status={user.status} />
      </div>
      
      <div className="flex items-center">
        <UserTypeColumn userType={user.userType} />
      </div>
      
      <div className="flex items-center">
        <LinkedAgentsColumn count={user.linkedSmartConnections} />
      </div>
      
      <div className="flex items-center">
        <ValidationColumn portalUser={user} />
        <div className="ml-auto">
          <ActionsColumn
            portalUser={user}
            onEdit={onEdit}
            onRemove={onRemove}
            onView2FA={onView2FA}
          />
        </div>
      </div>
    </div>
  );
}
