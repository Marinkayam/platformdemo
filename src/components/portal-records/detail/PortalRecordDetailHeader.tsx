
import { PortalRecord } from "@/types/portalRecord";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { getPortalLogoUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PortalRecordDetailHeaderProps {
  portalRecord: PortalRecord;
  actionButtons?: React.ReactNode[];
  className?: string;
}

export function PortalRecordDetailHeader({ portalRecord, actionButtons = [], className }: PortalRecordDetailHeaderProps) {
  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Count related invoices (simplified - would be dynamic in real app)
  const relatedInvoicesCount = portalRecord.invoiceNumber ? 1 : 0;

  return (
    <div className={cn("mb-8", className)}>
      <Card className="p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="text-lg font-semibold text-[#01173E]">
                  {portalRecord.portalRecordId}
                </div>
                <StatusBadge status={portalRecord.portalStatus} />
              </div>

              {actionButtons.length > 0 && (
                <div className="flex items-center gap-2">
                  {actionButtons}
                </div>
              )}
            </div>

            <div className="text-sm text-muted-foreground font-normal px-2 py-1">
              Buyer: {portalRecord.buyer}
            </div>
          </div>

          <div className="border-t border-[#E4E5E9] my-0"></div>

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
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-gray-500" />
              <span>Related invoices: {relatedInvoicesCount}</span>
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
