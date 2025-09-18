import { TriangleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BadgePill from "@/components/ui/badge-pill";

interface ConflictStatusBadgeProps {
  className?: string;
}

export function ConflictStatusBadge({ className }: ConflictStatusBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-block">
            <BadgePill 
              label="Conflicted" 
              color="warning" 
              variant="secondary"
              startIcon={<TriangleAlert className="w-3 h-3" />}
              className={className}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">This record is linked to multiple invoices. Resolve to continue.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}