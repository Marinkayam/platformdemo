import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PortalUser } from "@/types/portalUser";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow, format } from 'date-fns';
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalUserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalUser: PortalUser;
  onEditPortalUser: (user: PortalUser) => void;
}

export function PortalUserDetailModal({ isOpen, onClose, portalUser, onEditPortalUser }: PortalUserDetailModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  const lastUpdatedDate = new Date(portalUser.lastUpdated);
  const relativeTime = formatDistanceToNow(lastUpdatedDate, { addSuffix: true });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-6">
        <DialogHeader>
          <DialogTitle className="mb-2">Portal User Details</DialogTitle>
          <DialogDescription className="mt-0">View connection and usage details for this portal user.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
          {/* Portal Identity Block */}
          <div className="flex items-center gap-4 pb-4 border-b border-grey-200">
            <div className="w-12 h-12 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={getPortalLogoUrl(portalUser.portal)} alt={`${portalUser.portal} logo`} className="w-full h-full object-cover" width={48} height={48} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/portal-logos/placeholder.svg'; }} />
            </div>
            <div>
              <p className="font-medium text-lg text-grey-900">{portalUser.portal}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-grey-600">{portalUser.username}</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy portal login</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {portalUser.status === "Disconnected" && portalUser.issue && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4">
              <p className="font-medium">This user is currently disconnected.</p>
              <p className="text-xs mt-1">Update credentials to restore sync.</p>
            </div>
          )}

          {/* Status Section */}
          <div>
            <p className="text-grey-500 font-medium">Status</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <StatusBadge status={portalUser.status} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This user is currently {portalUser.status.toLowerCase()} to the portal.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* User Type Section */}
          <div>
            <p className="text-grey-500 font-medium">User Type</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
            <AgentUserTypeBadge type={portalUser.userType} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{portalUser.userType === "Monto" ? "Credentials managed by Monto" : "Customer-managed user. You can edit and remove this user."}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Linked Smart Connections Section */}
          <div>
            <p className="text-grey-500 font-medium">Linked Smart Connections</p>
            <p className="text-grey-700">
              {portalUser.linkedSmartConnections > 0
                ? `${portalUser.linkedSmartConnections} Smart Connection${portalUser.linkedSmartConnections !== 1 ? 's' : ''} linked.`
                : "No Smart Connections linked."
              }
            </p>
          </div>

          {/* Last Updated Section */}
          <div>
            <p className="text-grey-500 font-medium">Last Updated</p>
            <p className="text-grey-700">
              {format(lastUpdatedDate, 'MMM dd, yyyy HH:mm')}
              <span className="text-grey-500 ml-2">({relativeTime})</span>
            </p>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-grey-200">
          {!portalUser.isReadOnly && (
            <Button onClick={() => onEditPortalUser(portalUser)} variant="secondary" className="mr-2">
              Edit User
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 