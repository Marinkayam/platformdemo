
import React from 'react';
import { format } from 'date-fns';
import { PortalUser } from '@/types/portalUser';
import { StatusBadge } from "@/components/ui/status-badge";
import {
  PortalColumn,
  UsernameColumn,
  UserTypeColumn,
  LinkedAgentsColumn,
  ValidationColumn,
  ActionsColumn
} from './columns';

interface Column {
  key: keyof PortalUser | 'actions' | 'validation';
  label: string;
  sortable?: boolean;
  render: (value: any, row: PortalUser) => React.ReactNode;
}

interface GetColumnsParams {
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
  copyToClipboard: (text: string) => void;
}

export const getColumns = ({ onEdit, onRemove, onView2FA, copyToClipboard }: GetColumnsParams): Column[] => [
  {
    key: 'portal',
    label: 'Portal',
    sortable: true,
    render: (portal: string) => <PortalColumn portal={portal} />
  },
  {
    key: 'username',
    label: 'Username',
    sortable: true,
    render: (username: string) => (
      <UsernameColumn username={username} onCopy={copyToClipboard} />
    )
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (status: PortalUser['status']) => <StatusBadge status={status} />
  },
  {
    key: 'userType',
    label: 'User Type',
    sortable: true,
    render: (userType: PortalUser['userType']) => (
      <UserTypeColumn userType={userType} />
    )
  },
  {
    key: 'linkedSmartConnections',
    label: 'Linked Agents',
    sortable: true,
    render: (count: number) => <LinkedAgentsColumn count={count} />
  },
  {
    key: 'validation',
    label: 'Validation',
    sortable: false,
    render: (_, portalUser: PortalUser) => (
      <ValidationColumn portalUser={portalUser} />
    )
  },
  {
    key: 'lastUpdated',
    label: 'Last Updated',
    sortable: true,
    render: (lastUpdated: string) => (
      <span className="text-sm text-grey-700 whitespace-nowrap">
        {format(new Date(lastUpdated), 'MMM dd, yyyy HH:mm')}
      </span>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, portalUser) => (
      <ActionsColumn
        portalUser={portalUser}
        onEdit={onEdit}
        onRemove={onRemove}
        onView2FA={onView2FA}
      />
    )
  }
];
