
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PortalRecord } from "@/types/portalRecord";

interface PortalRecordActionsMenuProps {
  portalRecord: PortalRecord;
  onMatchInvoice?: () => void;
  onResolveConflict?: () => void;
  onIgnoreRecord?: () => void;
}

export function PortalRecordActionsMenu({ 
  portalRecord,
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord
}: PortalRecordActionsMenuProps) {
  const getMenuItems = () => {
    const items = [];

    if (portalRecord.connectionStatus === 'Connected') {
      if (portalRecord.matchType === 'Unmatched') {
        items.push({
          label: "Match Invoice",
          onClick: onMatchInvoice,
        });
      } else if (portalRecord.matchType === 'Conflict') {
        items.push({
          label: "Resolve Conflict",
          onClick: onResolveConflict,
        });
      }
      
      items.push({
        label: "Discard Record",
        onClick: onIgnoreRecord,
        className: "text-red-600 hover:text-red-700"
      });
    }

    return items;
  };

  const menuItems = getMenuItems();

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg z-50">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className={`cursor-pointer ${item.className || ""}`}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
