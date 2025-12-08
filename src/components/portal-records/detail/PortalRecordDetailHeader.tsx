
import { PortalRecord } from "@/types/portalRecord";
import { StatusBadge } from "@/components/ui/status-badge";
import { PortalRecordActionsMenu } from "./PortalRecordActionsMenu";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

  return (
    <div className={cn("mb-8", className)}>
      <Card className="p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Record:</span>
                  <span className="text-lg font-semibold text-[#01173E]">{(() => {
                    // Generate consistent 8-digit number from record id
                    const seed = portalRecord.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    return String(10000000 + (seed * 7919) % 90000000);
                  })()}</span>
                </div>
                <StatusBadge status={portalRecord.portalStatus} />
              </div>

              <PortalRecordActionsMenu
                portalRecord={portalRecord}
                onMatchInvoice={onMatchInvoice}
                onResolveConflict={onResolveConflict}
                onIgnoreRecord={onIgnoreRecord}
              />
            </div>

            <div className="text-sm text-muted-foreground px-2 py-1">
              <span className="font-medium">Buyer:</span> {portalRecord.buyer}
            </div>
          </div>

          <Separator className="border-[#E4E5E9] my-0" />

          <div className="flex items-center gap-6 text-sm text-muted-foreground font-normal px-2 py-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Portal:</span>
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
              <span>{portalRecord.portal || "N/A"}</span>
            </div>
            <div>
              <span><span className="font-medium">Total:</span> {formatCurrency(portalRecord.total, portalRecord.currency)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Scan Agent:</span>
              <Link
                to={`/scan-agents?openAgentModal=true&portal=${encodeURIComponent(portalRecord.portal)}`}
                className="hover:underline"
              >
                {portalRecord.portal === "SAP Ariba" ? "supplier@acmecorp.com" :
                 portalRecord.portal === "Coupa" ? "vendor@techsolutions.com" :
                 portalRecord.portal === "Jaggaer" ? "global@enterprise.com" :
                 "supplier@portal.com"}
              </Link>
            </div>
            <div>
              <span><span className="font-medium">Last synced:</span> {portalRecord.lastSynced}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
