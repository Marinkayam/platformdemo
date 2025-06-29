
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { ConnectionStatusBadge } from "../ConnectionStatusBadge";
import { PortalRecordActionsMenu } from "./PortalRecordActionsMenu";
import { cn } from "@/lib/utils";

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

  return (
    <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <PortalLogo portalName={portalRecord.portal} className="w-8 h-8" />
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                {portalRecord.invoiceNumber || portalRecord.portalRecordId}
              </h1>
              <MatchTypeBadge type={portalRecord.matchType} />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span><strong>Portal:</strong> {portalRecord.portal}</span>
              <span><strong>Buyer:</strong> {portalRecord.buyer}</span>
              <ConnectionStatusBadge status={portalRecord.connectionStatus} />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span><strong>Amount:</strong> {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: portalRecord.currency
              }).format(portalRecord.total)}</span>
              <span><strong>PO Number:</strong> {portalRecord.poNumber}</span>
            </div>
          </div>
        </div>

        <PortalRecordActionsMenu
          portalRecord={portalRecord}
          onMatchInvoice={onMatchInvoice}
          onResolveConflict={onResolveConflict}
          onIgnoreRecord={onIgnoreRecord}
          onSyncRecord={handleSyncRecord}
        />
      </div>
    </div>
  );
}
