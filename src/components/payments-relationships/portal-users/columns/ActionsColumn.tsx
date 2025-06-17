
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PortalUser } from '@/types/portalUser';
import { getRowActions } from '../utils/rowActions';

interface ActionsColumnProps {
  portalUser: PortalUser;
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
}

export function ActionsColumn({ portalUser, onEdit, onRemove, onView2FA }: ActionsColumnProps) {
  const actions = getRowActions(portalUser, { onEdit, onRemove, onView2FA });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={e => e.stopPropagation()}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50">
        {actions.map((action, index) => (
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
  );
}
