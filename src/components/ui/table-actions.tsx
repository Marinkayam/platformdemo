
import * as React from "react"
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface TableAction {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface TableActionsProps {
  actions: TableAction[];
  className?: string;
}

export function TableActions({ actions, className }: TableActionsProps) {
  return (
    <div className={cn("flex items-center justify-center w-[80px]", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                action.variant === "destructive" && "text-red-600 focus:text-red-600"
              )}
            >
              {action.icon && <action.icon className="h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Common action presets
export const commonActions = {
  view: (onClick: () => void): TableAction => ({
    label: "View Details",
    icon: Eye,
    onClick
  }),
  edit: (onClick: () => void): TableAction => ({
    label: "Edit",
    icon: Edit,
    onClick
  }),
  delete: (onClick: () => void): TableAction => ({
    label: "Delete",
    icon: Trash2,
    onClick,
    variant: "destructive" as const
  })
};
