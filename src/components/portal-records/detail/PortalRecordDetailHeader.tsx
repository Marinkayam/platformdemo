
import { PortalRecord } from "@/types/portalRecord";
import { StatusBadge } from "@/components/ui/status-badge";
import { PortalRecordActionsMenu } from "./PortalRecordActionsMenu";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getPortalLogoUrl } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PortalRecordDetailHeaderProps {
  portalRecord: PortalRecord;
  className?: string;
  onMatchInvoice?: () => void;
  onResolveConflict?: () => void;
  onIgnoreRecord?: () => void;
}

export function PortalRecordDetailHeader({
  portalRecord,
  className,
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord
}: PortalRecordDetailHeaderProps) {

  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Generate consistent 8-digit record number
  const recordNumber = (() => {
    const seed = portalRecord.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return String(10000000 + (seed * 7919) % 90000000);
  })();

  // Get agent email based on portal
  const agentEmail = portalRecord.portal === "SAP Ariba" ? "supplier@acmecorp.com" :
    portalRecord.portal === "Coupa" ? "vendor@techsolutions.com" :
    portalRecord.portal === "Jaggaer" ? "global@enterprise.com" :
    "supplier@portal.com";

  return (
    <div className={cn("mb-8", className)}>
      <Card className="p-6 rounded-xl">
        <div className="flex flex-col gap-6">
          {/* Top Tier: Record ID (left) and Status + Total Amount (right) */}
          <div className="flex items-start justify-between">
            {/* Primary Focus: Record ID */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground font-light">Record ID:</span>
              <span
                className="text-xl font-bold text-[#01173E] cursor-pointer select-all hover:text-[#7B59FF] transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(recordNumber);
                }}
                title="Click to copy"
              >
                {recordNumber}
              </span>
            </div>

            <div className="flex items-center gap-6">
              {/* Status */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <StatusBadge status={portalRecord.portalStatus} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Portal record status</p>
                </TooltipContent>
              </Tooltip>

              {/* Last Synced */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 cursor-help">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
                      <path d="M21 3v5h-5"/>
                    </svg>
                    <span className="text-sm font-light text-[#3F4758]">{portalRecord.lastSynced}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last synced from portal</p>
                </TooltipContent>
              </Tooltip>

              <PortalRecordActionsMenu
                portalRecord={portalRecord}
                onMatchInvoice={onMatchInvoice}
                onResolveConflict={onResolveConflict}
                onIgnoreRecord={onIgnoreRecord}
              />
            </div>
          </div>

          <Separator className="border-[#E4E5E9]" />

          {/* Bottom Tier: Metadata Grid */}
          <div className="flex gap-8">
              {/* Total Amount */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-light">Total Amount:</span>
                <span className="text-sm font-medium text-[#01173E]">{formatCurrency(portalRecord.total, portalRecord.currency)}</span>
              </div>

              {/* Buyer */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-light">Buyer:</span>
                <span className="text-sm font-medium text-[#01173E]">{portalRecord.buyer}</span>
              </div>

              {/* Portal */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-light">Portal:</span>
                {portalRecord.portal && (
                  <img
                    src={getPortalLogoUrl(portalRecord.portal)}
                    alt={`${portalRecord.portal} logo`}
                    className="w-4 h-4 object-contain rounded-full"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/portal-logos/placeholder.svg';
                    }}
                  />
                )}
                <span className="text-sm font-medium text-[#01173E]">{portalRecord.portal || "N/A"}</span>
              </div>

              {/* Agent */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-light">Agent:</span>
                <Link
                  to={`/scan-agents?openAgentModal=true&portal=${encodeURIComponent(portalRecord.portal)}`}
                  className="text-sm font-medium text-[#01173E] hover:underline"
                >
                  {agentEmail}
                </Link>
              </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
