
import { PortalRecord } from "@/types/portalRecord";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { ConnectionStatusBadge } from "../ConnectionStatusBadge";
import { PortalRecordActionsMenu } from "./PortalRecordActionsMenu";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalRecordDetailHeaderProps {
  portalRecord: PortalRecord;
  className?: string;
  onMatchInvoice?: () => void;
  onResolveConflict?: () => void;
  onIgnoreRecord?: () => void;
  onSyncRecord?: () => void;
}

export function PortalRecordDetailHeader({ 
  portalRecord, 
  className,
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord,
  onSyncRecord
}: PortalRecordDetailHeaderProps) {
  const handleSyncRecord = () => {
    console.log(`Syncing record ${portalRecord.id}`);
    // TODO: Implement sync record logic
    if (onSyncRecord) {
      onSyncRecord();
    }
  };

  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className={cn("mb-8", className)}>
      <Card className="p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="text-lg font-semibold text-[#01173E]">
                  {portalRecord.invoiceNumber || portalRecord.portalRecordId}
                </div>
                <ConnectionStatusBadge status={portalRecord.connectionStatus} />
                <MatchTypeBadge type={portalRecord.matchType} />
              </div>

              <PortalRecordActionsMenu
                portalRecord={portalRecord}
                onMatchInvoice={onMatchInvoice}
                onResolveConflict={onResolveConflict}
                onIgnoreRecord={onIgnoreRecord}
                onSyncRecord={handleSyncRecord}
              />
            </div>

            <div className="text-sm text-muted-foreground font-normal px-2 py-1">
              Buyer: {portalRecord.buyer}
            </div>
          </div>

          <Separator className="border-[#E4E5E9] my-0" />

          <div className="flex items-center gap-6 text-[14px] text-[#01173E] font-normal">
            <div className="flex items-center gap-2">
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
              <span>Portal: {portalRecord.portal || "N/A"}</span>
            </div>
            <div>
              <span>Total: {formatCurrency(portalRecord.total, portalRecord.currency)}</span>
            </div>
            <div>
              <span>Last synced: {portalRecord.lastSynced}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
