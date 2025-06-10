import React, { useState } from 'react';
import { Building, Eye, Edit, Trash2, Copy } from 'lucide-react';
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow, format } from 'date-fns';
import { PortalUser } from '@/types/portalUser';
import { AddPortalUserModal } from './AddPortalUserModal';
import { PortalUsersEmptyState } from './PortalUsersEmptyState';
import { View2FAModal } from './View2FAModal';
import { PortalUserDetailModal } from './PortalUserDetailModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/ui/status-badge";
import { getPortalLogoUrl } from "@/lib/utils";
import { ValidationProgressIndicator } from './ValidationProgressIndicator';

interface Column {
  key: keyof PortalUser | 'actions' | 'validation';
  label: string;
  sortable?: boolean;
  sticky?: boolean;
  render: (value: any, row: PortalUser) => React.ReactNode;
}

interface PortalUsersTableProps {
  // Temporarily commenting out prop to use internal mock data for demonstration
  // portalUsers: PortalUser[];
  onEditPortalUser?: (user: PortalUser) => void;
  onRemovePortalUser?: (id: string) => void;
}

export function PortalUsersTable({
  // Temporarily commenting out prop to use internal mock data for demonstration
  // portalUsers,
  onEditPortalUser,
  onRemovePortalUser,
}: PortalUsersTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [selected2FAUserId, setSelected2FAUserId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPortalUser, setSelectedPortalUser] = useState<PortalUser | null>(null);
  const navigate = useNavigate();

  const [mockPortalUsers, setMockPortalUsers] = useState<PortalUser[]>([
    {
      id: "2",
      portal: "Coupa",
      username: "user2@coupa.com",
      status: "Validating",
      userType: "External",
      linkedSmartConnections: 0,
      lastUpdated: new Date(Date.now() - (50 * 1000)).toISOString(), // 50% progress
      isReadOnly: false,
    },
    {
      id: "4",
      portal: "Bill",
      username: "user4@bill.com",
      status: "Validating",
      userType: "External",
      linkedSmartConnections: 0,
      lastUpdated: new Date(Date.now() - (30 * 1000)).toISOString(), // 30% progress
      isReadOnly: false,
    },
    {
      id: "5",
      portal: "Shopify",
      username: "user5@shopify.com",
      status: "Validating",
      userType: "Monto",
      linkedSmartConnections: 0,
      lastUpdated: new Date(Date.now() - (10 * 1000)).toISOString(), // 10% progress
      isReadOnly: true,
    },
    {
      id: "1",
      portal: "SAP Ariba",
      username: "user1@ariba.com",
      status: "Connected",
      userType: "Monto",
      linkedSmartConnections: 2,
      lastUpdated: "2023-10-26T10:00:00Z",
      isReadOnly: true,
    },
    {
      id: "3",
      portal: "Oracle Procurement",
      username: "user3@oracle.com",
      status: "Disconnected",
      userType: "Monto",
      linkedSmartConnections: 1,
      lastUpdated: "2023-10-25T15:30:00Z",
      isReadOnly: true,
    },
    {
      id: "6",
      portal: "Amazon Payee",
      username: "user6@amazon.com",
      status: "Connected",
      userType: "External",
      linkedSmartConnections: 3,
      lastUpdated: "2023-10-20T11:00:00Z",
      isReadOnly: false,
    },
  ]);

  // Use mockPortalUsers for rendering
  const portalUsers = mockPortalUsers; // Temporarily use internal state

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  const handleRowClick = (portalUser: PortalUser) => {
    setSelectedPortalUser(portalUser);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPortalUser(null);
  };

  const handleAddPortalUser = (userData: Partial<PortalUser>) => {
    console.log('Adding portal user:', userData);
    // In a real application, you'd send this to an API
  };

  const handleEditPortalUser = (userData: Partial<PortalUser>) => {
    console.log('Editing portal user:', userData);
    // In a real application, you'd send this to an API
  };

  const handleRemovePortalUser = (id: string) => {
    if (confirm('Are you sure you want to remove this portal user?\nThis may affect Smart Connections that depend on it.')) {
      console.log('Removing portal user:', id);
      // In a real application, you'd send this to an API
    }
  };

  const handleView2FA = (portalUserId: string) => {
    setSelected2FAUserId(portalUserId);
    setIs2FAModalOpen(true);
  };

  const close2FAModal = () => {
    setIs2FAModalOpen(false);
    setSelected2FAUserId(null);
  };

  const getRowActions = (portalUser: PortalUser) => [
    {
      label: "Edit",
      icon: Edit,
      onClick: () => setEditingUser(portalUser)
    },
    {
      label: "Remove",
      icon: Trash2,
      onClick: () => handleRemovePortalUser(portalUser.id),
      variant: "destructive" as const
    },
    {
      label: "View 2FA",
      icon: Eye,
      onClick: () => handleView2FA(portalUser.id),
    }
  ];

  const getValidationSteps = (portalUser: PortalUser) => {
    // This would typically come from your backend/state management
    // For now, we'll simulate some steps based on the portal
    const baseSteps = [
      { label: 'Connecting to portal', status: 'completed' as const },
      { label: 'Validating credentials', status: 'in-progress' as const },
      { label: 'Setting up secure connection', status: 'pending' as const },
      { label: 'Testing data access', status: 'pending' as const }
    ];

    // Simulate progress based on lastUpdated timestamp
    const now = new Date();
    const lastUpdated = new Date(portalUser.lastUpdated);
    const timeDiff = now.getTime() - lastUpdated.getTime();
    const progress = Math.min(Math.floor(timeDiff / 1000), 85); // 1% per second, max 85% for validation

    // Update step statuses based on progress
    if (progress > 75) {
      baseSteps[2].status = 'completed';
      baseSteps[3].status = 'in-progress';
    } else if (progress > 50) {
      baseSteps[2].status = 'in-progress';
    } else if (progress > 25) {
      baseSteps[1].status = 'completed';
      baseSteps[2].status = 'in-progress';
    }

    return {
      steps: baseSteps,
      progress,
      status: 'Validating portal connection...'
    };
  };

  const columns: Column[] = [
    {
      key: 'portal',
      label: 'Portal',
      sortable: true,
      sticky: true,
      render: (portal: string) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden">
            <img src={getPortalLogoUrl(portal)} alt={`${portal} logo`} className="w-full h-full object-cover" />
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
      render: (userType: PortalUser['userType'], portalUser: PortalUser) => (
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
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {getRowActions(portalUser).map((action, index) => (
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

  if (portalUsers.length === 0) {
    return <PortalUsersEmptyState onAddPortalUser={() => setIsAddModalOpen(true)} />;
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-grey-50 hover:bg-grey-50">
            {columns.map(column => (
              <TableHead key={column.key} className={column.sticky ? "sticky left-0 bg-grey-50 z-10 border-r border-grey-200" : ""}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {portalUsers.map((portalUser) => (
            <TableRow key={portalUser.id} className="h-[65px] hover:bg-grey-50 cursor-pointer transition-colors" onClick={() => handleRowClick(portalUser)}>
              {columns.map(column => (
                <TableCell key={column.key} className={column.sticky ? "sticky left-0 bg-background-paper z-10 border-r border-grey-200" : ""}>
                  {column.render(portalUser[column.key as keyof PortalUser], portalUser)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddPortalUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddPortalUser}
        portalUser={editingUser || undefined}
        mode={editingUser ? 'edit' : 'create'}
      />
      {is2FAModalOpen && selected2FAUserId && (
        <View2FAModal
          isOpen={is2FAModalOpen}
          onClose={close2FAModal}
          portalUserId={selected2FAUserId}
        />
      )}
      {isDetailModalOpen && selectedPortalUser && (
        <PortalUserDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          portalUser={selectedPortalUser}
          onEditPortalUser={(user) => {
            setEditingUser(user);
            setIsAddModalOpen(true);
            closeDetailModal(); // Close detail modal before opening edit modal
          }}
        />
      )}
    </div>
  );
} 