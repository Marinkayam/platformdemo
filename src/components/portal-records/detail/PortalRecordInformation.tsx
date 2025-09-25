
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PortalRecord } from "@/types/portalRecord";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Issue Date (Priority 1) */}
        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Issue Date</Label>
          <Input value={portalRecord.issueDate || "N/A"} readOnly className="bg-grey-200" />
        </div>

        {/* Total Amount (Priority 2) */}
        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Total Amount</Label>
          <Input value={formatCurrency(portalRecord.total)} readOnly className="bg-grey-200" />
        </div>

        {/* Portal Status (Priority 3) */}
        <div className="space-y-2">
          <Label className="text-sm text-grey-600">Portal Status</Label>
          <Input value={portalRecord.portalStatus || "N/A"} readOnly className="bg-grey-200" />
        </div>

        {/* PO Number (Priority 4) */}
        <div className="space-y-2">
          <Label className="text-sm text-grey-600">PO Number</Label>
          <Input value={portalRecord.poNumber || "N/A"} readOnly className="bg-grey-200" />
        </div>
      </div>

      {/* Collapsible additional details - remaining fields in priority order */}
      <div>
        {(!showCollapsed || isExpanded) && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Currency (Priority 5) */}
            <div className="space-y-2">
              <Label className="text-sm text-grey-600">Currency</Label>
              <Input value={portalRecord.currency} readOnly className="bg-grey-200" />
            </div>

            {/* Due Date (Priority 6) */}
            <div className="space-y-2">
              <Label className="text-sm text-grey-600">Due Date</Label>
              <Input value={portalRecord.dueDate || "N/A"} readOnly className="bg-grey-200" />
            </div>

            {/* Payment Terms (Priority 7) */}
            <div className="space-y-2">
              <Label className="text-sm text-grey-600">Payment Terms</Label>
              <Input value={portalRecord.paymentTerms || portalRecord.netTerms || 'N/A'} readOnly className="bg-grey-200" />
            </div>

            {/* Sub-total (Priority 8) */}
            <div className="space-y-2">
              <Label className="text-sm text-grey-600">Sub-total</Label>
              <Input value={formatCurrency(portalRecord.subtotal || portalRecord.total)} readOnly className="bg-grey-200" />
            </div>

            {/* Tax Total (Priority 9) */}
            <div className="space-y-2">
              <Label className="text-sm text-grey-600">Tax Total</Label>
              <Input value={formatCurrency(portalRecord.taxTotal || 0)} readOnly className="bg-grey-200" />
            </div>

            {/* Portal Creation Date (Priority 10) */}
            <div className="space-y-2">
              <Label className="text-sm text-grey-600">Portal Creation Date</Label>
              <Input value={portalRecord.portalCreationDate || portalRecord.createdAt || 'N/A'} readOnly className="bg-grey-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
