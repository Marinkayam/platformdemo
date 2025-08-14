
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { UsernameColumn } from './columns/UsernameColumn';
import { UserTypeColumn } from './columns/UserTypeColumn';

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
      className="user-row grid grid-cols-[1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-center pl-6">
        {/* Empty space for portal column alignment */}
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
      
      <div className="flex items-center justify-center">
        <ActionsColumn
          portalUser={user}
          onEdit={onEdit}
          onRemove={onRemove}
          onView2FA={onView2FA}
        />
      </div>
    </div>
  );
}
