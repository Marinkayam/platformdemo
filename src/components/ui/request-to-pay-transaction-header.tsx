import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, User, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";

interface RequestToPayTransactionHeaderProps {
  invoiceId: string;
  status: "Paid" | "Pending" | "Declined"; // Example statuses
  buyer: string;
  owner: string;
  transactionType: "Credit Memo" | "Invoice";
  actions?: {
    label: string;
    onClick: () => void;
    icon?: React.ElementType;
    isDestructive?: boolean;
  }[];
  className?: string;
}

export function RequestToPayTransactionHeader({
  invoiceId,
  status,
  buyer,
  owner,
  transactionType,
  actions,
  className,
}: RequestToPayTransactionHeaderProps) {
  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{invoiceId}</span>
            <StatusBadge status={status as any} />
          </div>
          {actions && actions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actions.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={action.onClick}
                    className={cn(action.isDestructive && "text-error-main")}
                  >
                    {action.icon && React.createElement(action.icon, { className: "mr-2 h-4 w-4" })}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">Buyer: {buyer}</p>

        <Separator className="mb-4" />

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-semibold mr-1">Owner:</span>
            <span>{owner}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="font-semibold mr-1">Transaction Type:</span>
            <span>{transactionType}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 