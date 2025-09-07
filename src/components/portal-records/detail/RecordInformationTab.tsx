
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Portal Record ID</Label>
            <Input value={record.portalRecordId} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Portal</Label>
            <Input value={record.portal} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Buyer</Label>
            <Input value={getDisplayValue(record.buyer)} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Supplier Name</Label>
            <Input value={getDisplayValue(record.supplierName)} readOnly className="bg-grey-200" />
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Total Amount</Label>
            <Input value={formatCurrency(record.total, record.currency)} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Currency</Label>
            <Input value={record.currency} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Invoice Number</Label>
            <Input value={getDisplayValue(record.invoiceNumber)} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">PO Number</Label>
            <Input value={getDisplayValue(record.poNumber)} readOnly className="bg-grey-200" />
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Connection Status</Label>
            <Input value={record.connectionStatus} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Portal Status</Label>
            <Input value={record.portalStatus} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Match Type</Label>
            <Input value={record.matchType} readOnly className="bg-grey-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-grey-600">Last Synced</Label>
            <Input value={record.lastSynced} readOnly className="bg-grey-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
