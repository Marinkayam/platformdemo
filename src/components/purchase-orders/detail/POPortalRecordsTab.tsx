import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { allPortalRecords } from "@/data/portalRecords";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "@/components/portal-records/PortalLogo";
import { StatusBadge } from "@/components/ui/status-badge";
import { FormField } from "@/components/ui/form-field";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface POPortalRecordsTabProps {
  poNumber: string;
}

export function POPortalRecordsTab({ poNumber }: POPortalRecordsTabProps) {
  const [selectedRecord, setSelectedRecord] = useState<PortalRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleViewDetails = (record: PortalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleNavigateToRecord = (recordId: string) => {
    navigate(`/portal-records/${recordId}`);
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    return `${symbol}${amount.toLocaleString()}`;
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
          These are portal invoice records linked to this Purchase Order in the portal. Each record shows key invoice details and its current status in the portal, and may be matched to an RTP in Monto.
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
                    Monto Status
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Total Amount
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Due Date
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Last Update
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors bg-white"
                  >
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <div className="flex items-center gap-2">
                        {record.conflict && (
                          <TriangleAlert className="w-4 h-4 text-[#FF9800]" />
                        )}
                        <button
                          onClick={() => handleViewDetails(record)}
                          className="text-sm font-medium text-black hover:text-gray-700 hover:underline cursor-pointer"
                        >
                          {record.invoiceNumber}
                        </button>
                      </div>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <StatusBadge status={record.portalStatus} />
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <span className="text-sm text-gray-600">
                        {formatCurrency(record.total, record.currency || 'USD')}
                      </span>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <span className="text-sm text-gray-600">
                        {getDueDateDisplay(record)}
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
                        Portal Record Info
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Portal Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              {selectedRecord.conflict && (
                <div className="bg-[#FFF8E1] text-[#7B5915] text-sm rounded-md p-4 border border-[#F2AE40]">
                  ⚠️ This Portal Record contains conflicting data. Please review the details to understand discrepancies.
                </div>
              )}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <FormField label="Portal Invoice Number" value={selectedRecord.invoiceNumber} />
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Monto Status</label>
                  <div className="flex items-center h-10 px-3 bg-gray-50 rounded-md border border-input">
                    <StatusBadge status={selectedRecord.portalStatus} />
                  </div>
                </div>
                <FormField label="Total Amount" value={formatCurrency(selectedRecord.total, selectedRecord.currency || 'USD')} />
                <FormField label="Due Date" value={getDueDateDisplay(selectedRecord)} />
                <FormField label="Last Update" value={format(new Date(selectedRecord.updated), "MMM d, yyyy")} />
                <FormField label="Portal" value={selectedRecord.portal} />
                <FormField label="Portal Status" value={selectedRecord.portalStatus} />
                <FormField label="Buyer" value={selectedRecord.buyer} />
                <FormField label="Supplier Name" value={selectedRecord.supplierName} />
                <FormField label="Currency" value={selectedRecord.currency || "USD"} />
                <FormField label="PO Number" value={selectedRecord.poNumber} />
                <FormField label="Net Terms" value={getNetTermsDisplay(selectedRecord)} />
                <FormField label="Promise to Pay" value={getPromiseToPayDisplay(selectedRecord)} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
