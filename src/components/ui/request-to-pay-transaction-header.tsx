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
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Declined":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{invoiceId}</span>
            <Badge
              className={cn(
                "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap border",
                getStatusStyles(status)
              )}
            >
              {status}
            </Badge>
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