
import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { PortalUser } from '@/types/portalUser';
import { PortalColumn } from '../columns/PortalColumn';
import { UsernameColumn } from '../columns/UsernameColumn';
import { UserTypeColumn } from '../columns/UserTypeColumn';
import { LinkedAgentsColumn } from '../columns/LinkedAgentsColumn';
import { ValidationColumn } from '../columns/ValidationColumn';
import { ActionsColumn } from '../columns/ActionsColumn';
import { StatusBadge } from '@/components/ui/status-badge';
import { PortalGroup, getPortalSummaryStatus, getPortalSummaryUserType } from '../utils/groupPortalUsers';

interface PortalRowProps {
  portalGroup: PortalGroup;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
  copyToClipboard: (text: string) => void;
}

export function PortalRow({ 
  portalGroup, 
  isExpanded, 
  onToggleExpansion,
  onEdit,
  onRemove,
  onView2FA,
  copyToClipboard
}: PortalRowProps) {
  const { portalName, users, userCount } = portalGroup;
  const isSingleUser = users.length === 1;
  const singleUser = isSingleUser ? users[0] : null;
  const summaryStatuses = getPortalSummaryStatus(users);
  const summaryUserType = getPortalSummaryUserType(users);

  const handleRowClick = () => {
    if (!isSingleUser) {
      onToggleExpansion();
    }
  };

  return (
    <div className="portal-group">
      {/* Main Portal Row */}
      <div 
        className={`
          grid grid-cols-7 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200
          ${!isSingleUser ? 'cursor-pointer' : ''}
        `}
        style={{ gridTemplateColumns: '3fr 2fr 1fr 2fr 1fr 2fr 1fr' }}
        onClick={handleRowClick}
      >
        {/* Portal Column */}
        <div className="flex items-center gap-3 sticky left-0 bg-white hover:bg-gray-50 z-10 border-r border-gray-200 min-w-[200px]">
          {!isSingleUser && (
            <button className="p-1 hover:bg-gray-200 rounded transition-colors duration-200">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          <PortalColumn portal={portalName} />
          {!isSingleUser && (
            <span className="text-sm text-gray-500 ml-2">
              {userCount} user{userCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Username Column */}
        <div>
          {isSingleUser && singleUser && (
            <UsernameColumn username={singleUser.username} onCopy={copyToClipboard} />
          )}
        </div>

        {/* Status Column */}
        <div className="flex flex-wrap gap-1">
          {isSingleUser && singleUser ? (
            <StatusBadge status={singleUser.status} />
          ) : (
            summaryStatuses.map(status => (
              <StatusBadge key={status} status={status} className="text-xs" />
            ))
          )}
        </div>

        {/* User Type Column */}
        <div>
          {isSingleUser && singleUser && (
            <UserTypeColumn userType={singleUser.userType} />
          )}
          {!isSingleUser && summaryUserType && (
            <UserTypeColumn userType={summaryUserType as PortalUser['userType']} />
          )}
        </div>

        {/* Linked Agents Column */}
        <div className="hidden md:block">
          {isSingleUser && singleUser && (
            <LinkedAgentsColumn count={singleUser.linkedSmartConnections} />
          )}
        </div>

        {/* Validation Column */}
        <div className="hidden lg:block">
          {isSingleUser && singleUser && (
            <ValidationColumn portalUser={singleUser} />
          )}
        </div>

        {/* Actions Column */}
        <div>
          {isSingleUser && singleUser && (
            <ActionsColumn
              portalUser={singleUser}
              onEdit={onEdit}
              onRemove={onRemove}
              onView2FA={onView2FA}
            />
          )}
        </div>
      </div>

      {/* Expanded User Rows */}
      {isExpanded && !isSingleUser && (
        <div className="bg-gray-100/50">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-7 gap-4 p-3 pl-16 border-b border-gray-100 bg-gray-100/50 hover:bg-gray-100 transition-colors duration-200"
              style={{ gridTemplateColumns: '3fr 2fr 1fr 2fr 1fr 2fr 1fr' }}
            >
              {/* Portal Column - User Label */}
              <div className="flex items-center gap-3 sticky left-0 bg-gray-100/50 hover:bg-gray-100 z-10 border-r border-gray-200 min-w-[200px]">
                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-700">
                  User {index + 1}
                </span>
              </div>

              {/* Username Column */}
              <div>
                <UsernameColumn username={user.username} onCopy={copyToClipboard} />
              </div>

              {/* Status Column */}
              <div>
                <StatusBadge status={user.status} />
              </div>

              {/* User Type Column */}
              <div>
                <UserTypeColumn userType={user.userType} />
              </div>

              {/* Linked Agents Column */}
              <div className="hidden md:block">
                <LinkedAgentsColumn count={user.linkedSmartConnections} />
              </div>

              {/* Validation Column */}
              <div className="hidden lg:block">
                <ValidationColumn portalUser={user} />
              </div>

              {/* Actions Column */}
              <div>
                <ActionsColumn
                  portalUser={user}
                  onEdit={onEdit}
                  onRemove={onRemove}
                  onView2FA={onView2FA}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
