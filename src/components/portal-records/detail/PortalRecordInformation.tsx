
import { PortalRecord } from "@/types/portalRecord";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FormField } from "@/components/ui/form-field";

interface PortalRecordInformationProps {
  portalRecord: PortalRecord;
  showCollapsed?: boolean;
}

export function PortalRecordInformation({ portalRecord, showCollapsed = false }: PortalRecordInformationProps) {
  const [isExpanded, setIsExpanded] = useState(!showCollapsed);

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
      <div className={`mb-4 ${showCollapsed ? 'flex items-center justify-between' : ''}`}>
        <h2 className="text-lg font-semibold">Portal Record Information</h2>
        {showCollapsed && (
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-sm font-medium text-gray-700">More Details</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        )}
      </div>

      {/* Always visible key information - collapsed view shows only Issue Date, Total Amount, Portal Status, PO Number */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <FormField label="Issue Date" value={portalRecord.issueDate || "N/A"} />
        <FormField label="Total Amount" value={formatCurrency(portalRecord.total)} />
        <FormField label="Portal Status" value={portalRecord.portalStatus || "N/A"} />
        <FormField label="PO Number" value={portalRecord.poNumber || "N/A"} />
        <FormField label="Currency" value={portalRecord.currency} />
        <FormField label="Due Date" value={portalRecord.dueDate || "N/A"} />
      </div>

      {/* Collapsible additional details - remaining fields in priority order */}
      <div>
        {(!showCollapsed || isExpanded) && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <FormField label="Payment Terms" value={portalRecord.paymentTerms || portalRecord.netTerms || 'N/A'} />
            <FormField label="Sub-total" value={formatCurrency(portalRecord.subtotal || portalRecord.total)} />
            <FormField label="Tax Total" value={formatCurrency(portalRecord.taxTotal || 0)} />
            <FormField label="Portal Creation Date" value={portalRecord.portalCreationDate || portalRecord.createdAt || 'N/A'} />
          </div>
        )}
      </div>
    </div>
  );
}
