
import { PortalRecord } from "@/types/portalRecord";

interface RecordInformationTabProps {
  record: PortalRecord;
}

export function RecordInformationTab({ record }: RecordInformationTabProps) {
  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getDisplayValue = (value: any): string => {
    if (!value || value === "—") return "—";
    return value.toString();
  };

  return (
    <div className="space-y-8">
      {/* Portal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Portal Record ID</label>
            <p className="mt-1 text-sm text-gray-900">{record.portalRecordId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Portal</label>
            <p className="mt-1 text-sm text-gray-900">{record.portal}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Buyer</label>
            <p className="mt-1 text-sm text-gray-900">{getDisplayValue(record.buyer)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Supplier Name</label>
            <p className="mt-1 text-sm text-gray-900">{getDisplayValue(record.supplierName)}</p>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Total Amount</label>
            <p className="mt-1 text-sm text-gray-900 font-medium">
              {formatCurrency(record.total, record.currency)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Currency</label>
            <p className="mt-1 text-sm text-gray-900">{record.currency}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Invoice Number</label>
            <p className="mt-1 text-sm text-gray-900">{getDisplayValue(record.invoiceNumber)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">PO Number</label>
            <p className="mt-1 text-sm text-gray-900">{getDisplayValue(record.poNumber)}</p>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Connection Status</label>
            <p className="mt-1 text-sm text-gray-900">{record.connectionStatus}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Portal Status</label>
            <p className="mt-1 text-sm text-gray-900">{record.portalStatus}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Match Type</label>
            <p className="mt-1 text-sm text-gray-900">{record.matchType}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Last Synced</label>
            <p className="mt-1 text-sm text-gray-900">{record.lastSynced}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
