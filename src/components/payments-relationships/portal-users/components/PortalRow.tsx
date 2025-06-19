
import React from 'react';
import { ChevronRight, ChevronDown, Copy } from 'lucide-react';
import { PortalUser } from '@/types/portalUser';
import { UserTypeColumn } from '../columns/UserTypeColumn';
import { LinkedAgentsColumn } from '../columns/LinkedAgentsColumn';
import { ValidationColumn } from '../columns/ValidationColumn';
import { ActionsColumn } from '../columns/ActionsColumn';
import { StatusBadge } from '@/components/ui/status-badge';
import { 
  PortalGroup, 
  getPortalSummaryStatus, 
  getPortalSummaryUserType,
  getPortalInitials,
  getPortalColor
} from '../utils/groupPortalUsers';

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

  const handleCopyUsername = (username: string, e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(username);
  };

  return (
    <div className="portal-group">
      {/* Main Portal Row */}
      <div 
        className={`
          grid grid-cols-7 gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 min-h-[48px] items-center
          ${!isSingleUser ? 'cursor-pointer bg-gray-25' : 'bg-white'}
        `}
        style={{ gridTemplateColumns: '3fr 2fr 1fr 2fr 1fr 2fr 1fr' }}
        onClick={handleRowClick}
      >
        {/* Portal Column */}
        <div className="flex items-center gap-4 sticky left-0 bg-inherit hover:bg-gray-50 z-10 border-r border-gray-200 min-w-[200px] pr-4">
          {!isSingleUser && (
            <button className="p-1 hover:bg-gray-200 rounded transition-colors duration-200 flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          
          {/* Portal Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 ${getPortalColor(portalName)}`}>
            {getPortalInitials(portalName)}
          </div>
          
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-900 text-base leading-tight truncate">
              {portalName}
            </span>
            {!isSingleUser && (
              <span className="text-sm text-gray-500 leading-tight">
                {userCount} user{userCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Username Column */}
        <div className="flex items-center gap-2">
          {isSingleUser && singleUser && (
            <>
              <span className="text-sm font-mono text-gray-700 truncate">
                {singleUser.username}
              </span>
              <button
                onClick={(e) => handleCopyUsername(singleUser.username, e)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Copy className="h-3 w-3" />
              </button>
            </>
          )}
        </div>

        {/* Status Column */}
        <div className="flex flex-wrap gap-1">
          {isSingleUser && singleUser ? (
            <StatusBadge status={singleUser.status} />
          ) : (
            <div className="flex gap-1">
              {summaryStatuses.map(status => (
                <StatusBadge key={status} status={status} className="text-xs px-2 py-1" />
              ))}
            </div>
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
        <div className="bg-gray-50 animate-accordion-down">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-7 gap-4 p-4 pl-20 border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-h-[40px] items-center"
              style={{ gridTemplateColumns: '3fr 2fr 1fr 2fr 1fr 2fr 1fr' }}
            >
              {/* Portal Column - User Label */}
              <div className="flex items-center gap-3 sticky left-0 bg-gray-50 hover:bg-gray-100 z-10 border-r border-gray-200 min-w-[200px] pr-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-700">
                  User {index + 1}
                </span>
              </div>

              {/* Username Column */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-gray-700 truncate">
                  {user.username}
                </span>
                <button
                  onClick={(e) => handleCopyUsername(user.username, e)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Copy className="h-3 w-3" />
                </button>
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
