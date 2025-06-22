
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { PortalStatusBadge } from "../PortalStatusBadge";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { ConnectionStatusBadge } from "../ConnectionStatusBadge";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalRecordHeaderProps {
  record: PortalRecord;
  actionButtons?: React.ReactNode[];
}

export function PortalRecordHeader({ record, actionButtons = [] }: PortalRecordHeaderProps) {
  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Count related invoices (simplified - would be dynamic in real app)
  const relatedInvoicesCount = record.invoiceNumber ? 1 : 0;

  return (
    <div className="mb-8">
      <Card className="p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="text-lg font-semibold text-[#01173E]">
                  {record.portalRecordId}
                </div>
                <ConnectionStatusBadge status={record.connectionStatus} />
                <PortalStatusBadge status={record.portalStatus} />
                <MatchTypeBadge type={record.matchType} />
              </div>

              {actionButtons.length > 0 && (
                <div className="flex items-center gap-2">
                  {actionButtons}
                </div>
              )}
            </div>

            <div className="text-sm text-muted-foreground font-normal px-2 py-1">
              Buyer: {record.buyer}
            </div>
          </div>

          <div className="border-t border-[#E4E5E9] my-0"></div>

          <div className="flex items-center gap-6 text-[14px] text-[#01173E] font-normal">
            <div className="flex items-center gap-2">
              {record.portal && (
                <img
                  src={getPortalLogoUrl(record.portal)}
                  alt={`${record.portal} logo`}
                  className="w-4 h-4 object-contain rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/portal-logos/placeholder.svg';
                  }}
                />
              )}
              <span>Portal: {record.portal || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-gray-500" />
              <span>Related invoices: {relatedInvoicesCount}</span>
            </div>
            <div>
              <span>Total: {formatCurrency(record.total, record.currency)}</span>
            </div>
            <div>
              <span>Last synced: {record.lastSynced}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
