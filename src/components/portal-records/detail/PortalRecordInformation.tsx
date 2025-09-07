
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const getPromiseToPayDisplay = () => {
    const toTime = (s?: string) => (s ? new Date(s).getTime() : NaN);
    const dueT = toTime(portalRecord.dueDate);
    const ptpT = toTime(portalRecord.promiseToPay);
    if (!isNaN(dueT) && !isNaN(ptpT)) {
      return ptpT >= dueT ? portalRecord.promiseToPay! : portalRecord.dueDate!;
    }
    if (!isNaN(ptpT)) return portalRecord.promiseToPay!;
    if (!isNaN(dueT)) return portalRecord.dueDate!;
    return 'N/A';
  };
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Portal Record Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Record ID</Label>
          <Input value={portalRecord.portalRecordId} readOnly className="bg-grey-200" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Portal</Label>
          <Input value={portalRecord.portal} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Buyer</Label>
          <Input value={portalRecord.buyer} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Invoice Number</Label>
          <Input value={portalRecord.invoiceNumber || "N/A"} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Total Amount</Label>
          <Input value={formatCurrency(portalRecord.total)} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Currency</Label>
          <Input value={portalRecord.currency} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">PO Number</Label>
          <Input value={portalRecord.poNumber} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Supplier Name</Label>
          <Input value={portalRecord.supplierName} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Net Terms</Label>
          <Input value={portalRecord.netTerms || 'N/A'} readOnly className="bg-grey-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Promise to Pay</Label>
          <Input value={getPromiseToPayDisplay()} readOnly className="bg-grey-200" />
        </div>
      </div>
    </div>
  );
}
