
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { PortalUser } from '@/types/portalUser';

interface RowAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: (e: React.MouseEvent) => void;
  variant?: "destructive";
}

interface GetRowActionsParams {
  onEdit: (user: PortalUser) => void;
  onRemove: (id: string) => void;
  onView2FA: (id: string) => void;
}

export const getRowActions = (
  portalUser: PortalUser, 
  { onEdit, onRemove, onView2FA }: GetRowActionsParams
): RowAction[] => {
  if (portalUser.userType === "Monto" || portalUser.userType === "Monto User") {
    return [
      {
        label: "View 2FA",
        icon: Eye,
        onClick: (e: React.MouseEvent) => { e.stopPropagation(); onView2FA(portalUser.id); },
      }
    ];
  }

  // For External users, show all actions
  return [
    {
      label: "Edit",
      icon: Edit,
      onClick: (e: React.MouseEvent) => { e.stopPropagation(); onEdit(portalUser); }
    },
    {
      label: "Delete Scan Agent",
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
};
