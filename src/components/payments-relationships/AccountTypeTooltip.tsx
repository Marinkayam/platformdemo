
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AccountTypeTooltipProps {
  type: "Customer" | "Monto";
  children: React.ReactNode;
}

export function AccountTypeTooltip({ type, children }: AccountTypeTooltipProps) {
  const tooltipContent = type === "Customer" 
    ? "Use your company's existing login to access this portal."
    : "Create a dedicated user for Monto to manage portal access independently.";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-48">{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
}
