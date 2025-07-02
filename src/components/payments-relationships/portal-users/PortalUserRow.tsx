
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { PortalColumn } from './columns/PortalColumn';
import { UserTypeColumn } from './columns/UserTypeColumn';
import { ValidationColumn } from './columns/ValidationColumn';
import { ActionsColumn } from './columns/ActionsColumn';
import { StatusBadge } from '@/components/ui/status-badge';

interface PortalUserRowProps {
  user: PortalUser;
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
  onRowClick: (user: PortalUser) => void;
}

export function PortalUserRow({ 
  user, 
  onEdit, 
  onRemove, 
  onView2FA, 
  onRowClick 
}: PortalUserRowProps) {
  return (
    <div 
      key={user.id}
      className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-6 hover:bg-gray-50 cursor-pointer transition-colors min-h-[90px]"
      onClick={() => onRowClick(user)}
    >
      <div className="flex items-center">
        <PortalColumn portal={user.portal} />
      </div>
      <div className="flex items-center">
        <span className="text-sm truncate max-w-[160px]">{user.username}</span>
      </div>
      <div className="flex items-center">
        <StatusBadge status={user.status} />
      </div>
      <div className="flex items-center">
        <UserTypeColumn userType={user.userType} />
      </div>
      <div className="flex items-center">
        <ValidationColumn portalUser={user} />
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
