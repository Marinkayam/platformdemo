
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { PortalUser } from '@/types/portalUser';

interface UserTypeColumnProps {
  userType: PortalUser['userType'];
}

export function UserTypeColumn({ userType }: UserTypeColumnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <AgentUserTypeBadge type={(userType === "Monto" || userType === "Monto User") ? "Monto" : "External"} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {(userType === "Monto" || userType === "Monto User")
              ? "Monto-managed user. You can view credentials but not edit them."
              : "Customer-managed user. You can edit and remove this user."
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
