
import React from 'react';
import { PortalUser } from '@/types/portalUser';
import { PortalGroupHeader } from './PortalGroupHeader';
import { PortalRowGroup } from './PortalRowGroup';
import { PortalUserRow } from './PortalUserRow';
import { PortalDisplay } from './utils/portalAggregation';

interface PortalUsersTableBodyProps {
  allPortals: PortalDisplay[];
  expandedGroups: Set<string>;
  onToggleGroup: (portalName: string) => void;
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
  onRowClick: (user: PortalUser) => void;
  copyToClipboard: (text: string) => void;
}

export function PortalUsersTableBody({
  allPortals,
  expandedGroups,
  onToggleGroup,
  onEdit,
  onRemove,
  onView2FA,
  onRowClick,
  copyToClipboard
}: PortalUsersTableBodyProps) {
  return (
    <div className="divide-y divide-gray-100">
      {allPortals.map((portalDisplay) => (
        <div key={portalDisplay.portal}>
          {portalDisplay.displayType === 'individual' ? (
            // Individual Portal Row
            portalDisplay.users.map((user) => (
              <div key={user.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="text-sm">{user.portal}</div>
                <div className="text-sm">{user.username}</div>
                <div className="text-sm">{user.status}</div>
                <div className="text-sm">{user.userType}</div>
                <div className="text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    ⋯
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Grouped Portal Row
            portalDisplay.portalGroup && (
              <>
                <PortalGroupHeader
                  portalGroup={portalDisplay.portalGroup}
                  isExpanded={expandedGroups.has(portalDisplay.portal)}
                  onToggle={() => onToggleGroup(portalDisplay.portal)}
                />
                <PortalRowGroup
                  users={portalDisplay.users}
                  isExpanded={expandedGroups.has(portalDisplay.portal)}
                  onEdit={onEdit}
                  onRemove={onRemove}
                  onView2FA={onView2FA}
                  copyToClipboard={copyToClipboard}
                  onUserClick={onRowClick}
                />
              </>
            )
          )}
        </div>
      ))}
    </div>
  );
}
