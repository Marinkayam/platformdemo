
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
              <PortalUserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onRemove={onRemove}
                onView2FA={onView2FA}
                onRowClick={onRowClick}
              />
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
