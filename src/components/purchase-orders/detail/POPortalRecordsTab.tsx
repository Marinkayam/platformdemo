import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, TriangleAlert } from "lucide-react";
import { allPortalRecords } from "@/data/portalRecords";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "@/components/portal-records/PortalLogo";
import { StatusBadge } from "@/components/ui/status-badge";
import { FormField } from "@/components/ui/form-field";
import { useNavigate } from "react-router-dom";

interface POPortalRecordsTabProps {
  poNumber: string;
}

export function POPortalRecordsTab({ poNumber }: POPortalRecordsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [records, setRecords] = useState<PortalRecord[]>([]);
  const navigate = useNavigate();

  // Filter portal records by PO number
  useEffect(() => {
    if (!poNumber) {
      console.log('No PO Number provided');
      setRecords([]);
      return;
    }

    console.log('PO Number:', poNumber);
    console.log('All Portal Records:', allPortalRecords);

    const relevantRecords = allPortalRecords.filter(record => {
      console.log('Checking record:', record.id, 'poNumber:', record.poNumber, 'against PO:', poNumber);

      // Skip records without PO numbers
      if (!record.poNumber) return false;

      // Direct match with PO number
      if (record.poNumber === poNumber) return true;

      // Try various matching patterns
      const cleanPONumber = poNumber.replace('PO-', '').replace(/^0+/, '');
      const cleanRecordPO = record.poNumber.replace('PO-', '').replace(/^0+/, '');

      return cleanRecordPO === cleanPONumber;
    });

    console.log('Filtered relevant records:', relevantRecords);
    setRecords(relevantRecords);
  }, [poNumber]);

  // Auto-expand first record on mount
  useEffect(() => {
    if (records.length > 0 && !expandedId) {
      setExpandedId(records[0].id);
    }
  }, [records]);

  const computeDueDateStr = (record: PortalRecord) => {
    const fmt = (d: Date) => format(d, "MM/dd/yyyy");

    // If dueDate exists and is valid, format and return
    if (record.dueDate) {
      const d = new Date(record.dueDate);
      if (!isNaN(d.getTime())) return fmt(d);
    }

    // Try to infer from invoiceDate + net terms
    const inv = record.invoiceDate ? new Date(record.invoiceDate) : null;
    if (inv && !isNaN(inv.getTime())) {
      let days = 30;
      if (record.netTerms) {
        const m = record.netTerms.match(/(\d+)/);
        if (m) days = parseInt(m[1], 10);
      }
      const due = new Date(inv);
      due.setDate(due.getDate() + days);
      return fmt(due);
    }

    // Default fake due date: today + 30
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 30);
    return fmt(fallback);
  };

  const getDueDateDisplay = (record: PortalRecord) => computeDueDateStr(record);

  const getPromiseToPayDisplay = (record: PortalRecord) => {
    const fmt = (d: Date) => format(d, "MM/dd/yyyy");

    // Base candidate: provided PTP or today + 7
    let candidate = record.promiseToPay ? new Date(record.promiseToPay) : new Date();
    if (!record.promiseToPay) candidate.setDate(candidate.getDate() + 7);

    // Ensure candidate >= computed due date
    const dueStr = computeDueDateStr(record);
    const dueDate = new Date(dueStr);
    if (!isNaN(dueDate.getTime()) && candidate.getTime() < dueDate.getTime()) {
      candidate = dueDate;
    }

    return fmt(candidate);
  };

  const getNetTermsDisplay = (record: PortalRecord) => {
    if (record.netTerms) return record.netTerms;

    // Try to infer from invoiceDate and dueDate
    const inv = record.invoiceDate ? new Date(record.invoiceDate) : null;
    const due = record.dueDate ? new Date(record.dueDate) : null;
    if (inv && !isNaN(inv.getTime()) && due && !isNaN(due.getTime())) {
      const diffDays = Math.max(0, Math.round((due.getTime() - inv.getTime()) / (1000 * 60 * 60 * 24)));
      return `Net ${diffDays}`;
    }

    // Default fake Net Terms
    return "Net 30";
  };

  const toggleExpanded = (recordId: string) => {
    setExpandedId(prev => prev === recordId ? null : recordId);
  };

  const handleNavigateToRecord = (recordId: string) => {
    navigate(`/portal-records/${recordId}`);
  };

  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="text-center text-gray-600 py-10">
          No portal invoice records found for this purchase order.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          These are portal invoices linked to this Purchase Order. Each record displays key invoice attributes and its current status in the portal.
        </p>

        {/* Single Table for All Records */}
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F7F9] border-b border-gray-200">
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Portal Invoice Number
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Portal
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Portal Status
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Last Synced
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Last Updated
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record, index) => (
                  <>
                    {/* Main Row */}
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors bg-white"
                      onClick={() => toggleExpanded(record.id)}
                    >
                      <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                        <div className="flex items-center gap-2">
                          {expandedId === record.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                          {record.conflict && (
                            <TriangleAlert className="w-4 h-4 text-[#FF9800]" />
                          )}
                          <span className="text-sm font-medium text-black">
                            {record.invoiceNumber}
                          </span>
                        </div>
                      </td>
                      <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                        <PortalLogo portalName={record.portal} className="w-4 h-4" />
                      </td>
                      <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                        <StatusBadge status={record.portalStatus} />
                      </td>
                      <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                        <span className="text-sm text-gray-600">
                          {format(new Date(record.lastSynced || record.updated), "MMM d, yyyy")}
                        </span>
                      </td>
                      <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                        <span className="text-sm text-gray-600">
                          {format(new Date(record.updated), "MMM d, yyyy")}
                        </span>
                      </td>
                      <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigateToRecord(record.id);
                          }}
                          className="text-[#7B59FF] hover:text-[#7B59FF] hover:bg-transparent font-medium -ml-3"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedId === record.id && (
                      <tr>
                        <td colSpan={6} className="bg-white border-t border-gray-100">
                          <div className="px-6 pt-6 pb-4">
                            {record.conflict && (
                              <div className="bg-[#FFF8E1] text-[#7B5915] text-sm rounded-md p-4 mb-4 border border-[#F2AE40]">
                                ⚠️ This Portal Record contains conflicting data. Please review the details to understand discrepancies.
                              </div>
                            )}
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-900">Portal Invoice Details</h3>
                              </div>

                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <FormField label="Portal Invoice Number" value={record.invoiceNumber} />
                                <FormField label="Portal" value={record.portal} />
                                <FormField label="Buyer" value={record.buyer} />
                                <FormField label="Total Amount" value={`${record.currency === 'EUR' ? '€' : record.currency === 'GBP' ? '£' : '$'}${record.total.toLocaleString()}`} />
                                <FormField label="Currency" value={record.currency || "USD"} />
                                <FormField label="PO Number" value={record.poNumber} />
                                <FormField label="Due Date" value={getDueDateDisplay(record)} />
                                <FormField label="Net Terms" value={getNetTermsDisplay(record)} />
                                <FormField label="Promise to Pay" value={getPromiseToPayDisplay(record)} />
                                <FormField label="Supplier Name" value={record.supplierName} />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
