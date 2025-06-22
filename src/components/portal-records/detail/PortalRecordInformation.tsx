
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Portal Record Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Record ID</label>
              <p className="text-sm text-gray-900">{portalRecord.portalRecordId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Portal</label>
              <p className="text-sm text-gray-900">{portalRecord.portal}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Buyer</label>
              <p className="text-sm text-gray-900">{portalRecord.buyer}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Invoice Number</label>
              <p className="text-sm text-gray-900">{portalRecord.invoiceNumber || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Total Amount</label>
              <p className="text-sm font-semibold text-gray-900">{formatCurrency(portalRecord.total)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Currency</label>
              <p className="text-sm text-gray-900">{portalRecord.currency}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Connection Status</label>
              <p className="text-sm text-gray-900">{portalRecord.connectionStatus}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Portal Status</label>
              <p className="text-sm text-gray-900">{portalRecord.portalStatus}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Match Type</label>
              <p className="text-sm text-gray-900">{portalRecord.matchType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Last Synced</label>
              <p className="text-sm text-gray-900">{portalRecord.lastSynced}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
