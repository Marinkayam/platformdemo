import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PortalUser } from "@/types/portalUser";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow, format } from 'date-fns';
import { AgentStatusBadge } from '@/components/ui/agent-status-badge';
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PortalUserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalUser: PortalUser;
}

export function PortalUserDetailModal({ isOpen, onClose, portalUser }: PortalUserDetailModalProps) {
  const getPortalLogoUrl = (portalName: string): string => {
    const logoMap: { [key: string]: string } = {
      "SAP Ariba": "ariba.png",
      "Coupa": "coupa.png",
      "Oracle Procurement": "oracle.png",
      "Tipalti": "tipalti.png",
      "Amazon Payee": "Amazon Payee.png",
      "Apple": "apple.png",
      "AT&T": "AT&T.png",
      "Bill": "bill.png",
      "Facturaxion": "Facturaxion.png",
      "Fieldglass": "Fieldglass.png",
      "iSupplier": "iSupplier.png",
      "KissFlow": "KissFlow.png",
      "Qualcomm": "Qualcomm.png",
      "Sainsburys": "Sainsburys.png",
      "Segment": "Segment.png",
      "Shopify": "shopify.png",
      "StoreNext": "StoreNext.png",
      "Taulia": "taulia.png",
      "Teradata": "Teradata.png",
      "Tungsten": "tungsten.png",
      "Walmart": "walmart.png",
    };
    return `/portal-logos/${logoMap[portalName] || portalName.toLowerCase().replace(/\s/g, '-') + '.png'}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Portal User Details</DialogTitle>
          <DialogDescription>
            Comprehensive information about the selected portal user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={getPortalLogoUrl(portalUser.portal)} alt={`${portalUser.portal} logo`} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-medium text-lg text-grey-900">{portalUser.portal}</p>
              <div className="flex items-center gap-2">
                <p className="text-grey-600">{portalUser.username}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(portalUser.username);
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-grey-500 font-medium">Status</p>
            <AgentStatusBadge status={portalUser.status} />
          </div>

          <div className="space-y-2">
            <p className="text-grey-500 font-medium">User Type</p>
            <AgentUserTypeBadge type={portalUser.userType} />
          </div>

          <div className="space-y-2">
            <p className="text-grey-500 font-medium">Linked Agents</p>
            <p className="text-grey-700">
              {portalUser.linkedSmartConnections > 0
                ? `${portalUser.linkedSmartConnections} Payments Relationship${portalUser.linkedSmartConnections !== 1 ? 's' : ''} linked.`
                : "No Payments Relationships linked."
              }
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-grey-500 font-medium">Last Updated</p>
            <p className="text-grey-700">{format(new Date(portalUser.lastUpdated), 'MMM dd, yyyy HH:mm')}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 