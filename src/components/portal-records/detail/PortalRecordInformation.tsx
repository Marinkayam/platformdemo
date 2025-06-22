
import { Input } from "@/components/ui/input";
import { PortalRecord } from "@/types/portalRecord";

interface PortalRecordInformationProps {
  portalRecord: PortalRecord;
}

export function PortalRecordInformation({ portalRecord }: PortalRecordInformationProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: portalRecord.currency || 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Portal Record Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Record ID</label>
          <Input value={portalRecord.portalRecordId} readOnly className="bg-gray-50" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Portal</label>
          <Input value={portalRecord.portal} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Buyer</label>
          <Input value={portalRecord.buyer} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Invoice Number</label>
          <Input value={portalRecord.invoiceNumber || "N/A"} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Total Amount</label>
          <Input value={formatCurrency(portalRecord.total)} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Currency</label>
          <Input value={portalRecord.currency} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">PO Number</label>
          <Input value={portalRecord.poNumber} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Supplier Name</label>
          <Input value={portalRecord.supplierName} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Connection Status</label>
          <Input value={portalRecord.connectionStatus} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Portal Status</label>
          <Input value={portalRecord.portalStatus} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Match Type</label>
          <Input value={portalRecord.matchType} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Last Synced</label>
          <Input value={portalRecord.lastSynced} readOnly className="bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
