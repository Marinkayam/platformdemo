
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { PortalStatusBadge } from "../PortalStatusBadge";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { ConnectionStatusBadge } from "../ConnectionStatusBadge";

interface PortalRecordHeaderProps {
  record: PortalRecord;
}

export function PortalRecordHeader({ record }: PortalRecordHeaderProps) {
  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {record.portalRecordId}
          </h1>
          <div className="flex items-center gap-3">
            <PortalLogo portalName={record.portal} />
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">{record.buyer}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ConnectionStatusBadge status={record.connectionStatus} />
          <PortalStatusBadge status={record.portalStatus} />
          <MatchTypeBadge type={record.matchType} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(record.total, record.currency)}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Invoice Number</p>
          <p className="text-lg font-semibold text-gray-900">
            {record.invoiceNumber || "—"}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">PO Number</p>
          <p className="text-lg font-semibold text-gray-900">
            {record.poNumber || "—"}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Last Synced</p>
          <p className="text-lg font-semibold text-gray-900">
            {record.lastSynced}
          </p>
        </div>
      </div>
    </div>
  );
}
