
import { PortalRecord } from "@/types/portalRecord";
import { FormField } from "@/components/ui/form-field";

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

      {/* Key information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <FormField label="Issue Date" value={portalRecord.issueDate || "N/A"} />
        <FormField label="Total Amount" value={formatCurrency(portalRecord.total)} />
        <FormField label="Portal Status" value={portalRecord.portalStatus || "N/A"} />
        <FormField label="PO Number" value={portalRecord.poNumber || "N/A"} />
        <FormField label="Currency" value={portalRecord.currency} />
        <FormField label="Due Date" value={portalRecord.dueDate || "N/A"} />
      </div>

      {/* Additional details */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <FormField label="Payment Terms" value={portalRecord.paymentTerms || portalRecord.netTerms || 'N/A'} />
        <FormField label="Sub-total" value={formatCurrency(portalRecord.subtotal || portalRecord.total)} />
        <FormField label="Tax Total" value={formatCurrency(portalRecord.taxTotal || 0)} />
        <FormField label="Portal Creation Date" value={portalRecord.portalCreationDate || portalRecord.createdAt || 'N/A'} />
      </div>
    </div>
  );
}
