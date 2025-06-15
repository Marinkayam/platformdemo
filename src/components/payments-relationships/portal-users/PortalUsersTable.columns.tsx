
import React from 'react';
import { Eye, Edit, Trash2, Copy, MoreVertical } from 'lucide-react';
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { PortalUser } from '@/types/portalUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/ui/status-badge";
import { getPortalLogoUrl } from "@/lib/utils";
import { ValidationProgressIndicator } from './ValidationProgressIndicator';
import { getValidationSteps } from './utils';

interface Column {
  key: keyof PortalUser | 'actions' | 'validation';
  label: string;
  sortable?: boolean;
  sticky?: boolean;
  render: (value: any, row: PortalUser) => React.ReactNode;
}

interface GetColumnsParams {
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
  copyToClipboard: (text: string) => void;
}

const getRowActions = (portalUser: PortalUser, { onEdit, onRemove, onView2FA }: Omit<GetColumnsParams, 'copyToClipboard'>) => [
  {
    label: "Edit",
    icon: Edit,
    onClick: (e: React.MouseEvent) => { e.stopPropagation(); onEdit(portalUser); }
  },
  {
    label: "Remove",
    icon: Trash2,
    onClick: (e: React.MouseEvent) => { e.stopPropagation(); onRemove(portalUser.id); },
    variant: "destructive" as const
  },
  {
    label: "View 2FA",
    icon: Eye,
    onClick: (e: React.MouseEvent) => { e.stopPropagation(); onView2FA(portalUser.id); },
  }
];

export const getColumns = ({ onEdit, onRemove, onView2FA, copyToClipboard }: GetColumnsParams): Column[] => [
  {
    key: 'portal',
    label: 'Portal',
    sortable: true,
    sticky: true,
    render: (portal: string) => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden">
          <img src={getPortalLogoUrl(portal)} alt={`${portal} logo`} className="w-full h-full object-contain" />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-medium cursor-help">{portal}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{portal}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  },
  {
    key: 'username',
    label: 'Username',
    sortable: true,
    render: (username: string) => (
      <div className="flex items-center gap-2">
        <span className="text-sm">{username}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(username);
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <AgentUserTypeBadge type={userType} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {userType === "Monto"
                ? "Monto-managed user. You can view credentials but not edit them."
                : "Customer-managed user. You can edit and remove this user."
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    key: 'linkedSmartConnections',
    label: 'Linked Agents',
    sortable: true,
    render: (count: number) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help">
              {count > 0 ? `${count}` : '—'}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {count > 0
                ? `This user is linked to ${count} Payments Relationship${count !== 1 ? 's' : ''}.`
                : "This user isn't linked to any Payments Relationship yet."
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    key: 'validation',
    label: 'Validation',
    sortable: false,
    render: (_, portalUser: PortalUser) => {
      if (portalUser.status === 'Validating') {
        const { steps, progress, status: validationStatus } = getValidationSteps(portalUser);
        return (
          <div className="w-[90%]">
            <ValidationProgressIndicator
              progress={progress}
              status={validationStatus}
              steps={steps}
            />
          </div>
        );
      }
      return null;
    }
  },
  {
    key: 'lastUpdated',
    label: 'Last Updated',
    sortable: true,
    render: (lastUpdated: string) => (
      <span className="text-sm text-grey-700">
        {format(new Date(lastUpdated), 'MMM dd, yyyy HH:mm')}
      </span>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, portalUser) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={e => e.stopPropagation()}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {getRowActions(portalUser, { onEdit, onRemove, onView2FA }).map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              className={action.variant === "destructive" ? "text-red-600" : ""}
            >
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];
