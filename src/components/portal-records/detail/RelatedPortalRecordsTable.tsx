import { useState } from "react";
import { format } from "date-fns";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { StatusBadge } from "@/components/ui/status-badge";
import { TriangleAlert } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RelatedPortalRecordsTableProps {
  currentRecord: PortalRecord;
  onViewDetails: (recordId: string) => void;
}

// Generate mock related records based on current record
function generateRelatedRecords(currentRecord: PortalRecord): PortalRecord[] {
  const baseInvoiceNumber = currentRecord.invoiceNumber || 'INV-00000005';

  return [
    {
      ...currentRecord,
      id: `${currentRecord.id}-primary`,
      portal: 'Coupa',
      portalStatus: 'Paid',
      matchType: 'Primary',
      lastSynced: '2024-01-25',
      updated: '2024-01-25',
      invoiceNumber: baseInvoiceNumber,
    },
    {
      ...currentRecord,
      id: `${currentRecord.id}-alt-1`,
      portal: 'SAP Ariba',
      portalStatus: 'Paid',
      matchType: 'Alternate',
      lastSynced: '2024-01-25',
      updated: '2024-01-25',
      invoiceNumber: baseInvoiceNumber,
    },
    {
      ...currentRecord,
      id: `${currentRecord.id}-alt-2`,
      portal: 'Tipalti',
      portalStatus: 'Settled',
      matchType: 'Alternate',
      lastSynced: '2024-01-25',
      updated: '2024-01-25',
      invoiceNumber: baseInvoiceNumber,
    },
  ];
}

export function RelatedPortalRecordsTable({
  currentRecord,
  onViewDetails
}: RelatedPortalRecordsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PortalRecord | null>(null);

  // Generate related records
  const records = generateRelatedRecords(currentRecord);

  const getStatusTooltip = (status: PortalRecord['portalStatus']): string => {
    const tooltips: Record<PortalRecord['portalStatus'], string> = {
      'Approved by Buyer': 'The invoice has been reviewed and approved by the buyer in the portal',
      'Rejected by Buyer': 'The invoice has been rejected by the buyer and requires attention',
      'Paid': 'The invoice has been marked as paid in the buyer portal',
      'Settled': 'The payment has been completed and settled',
      'Partially Settled': 'The invoice has been partially paid, with remaining balance due',
      'Pending Approval': 'The invoice is awaiting buyer approval in the portal'
    };
    return tooltips[status] || 'Portal status of the invoice';
  };

  const handleViewDetails = (record: PortalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatTimestamp = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), "MMM d, yyyy HH:mm");
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Related Portal Records</h3>
          <p className="text-sm text-gray-600">
            These records were pulled from buyer portals and linked to this invoice.
          </p>
        </div>

        {/* Table */}
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
                    Match Type
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Currency
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Total
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Updated At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => (
                  <tr
                    key={record.id}
                    onClick={() => handleViewDetails(record)}
                    className="hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                  >
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <div className="flex items-center gap-2">
                        {record.conflict && (
                          <TriangleAlert className="w-4 h-4 text-[#FF9800]" />
                        )}
                        <span className="text-sm font-medium text-black hover:text-gray-700 hover:underline">
                          {record.invoiceNumber}
                        </span>
                      </div>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <div className="flex items-center gap-2">
                        <PortalLogo portalName={record.portal} className="w-4 h-4" />
                        <span className="text-sm text-gray-900">{record.portal}</span>
                      </div>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <StatusBadge status={record.portalStatus} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getStatusTooltip(record.portalStatus)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <MatchTypeBadge type={record.matchType} />
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <span className="text-sm text-gray-600">
                        {record.currency || 'USD'}
                      </span>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <span className="text-sm text-gray-600">
                        {formatCurrency(record.total, record.currency || 'USD')}
                      </span>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <span className="text-sm text-gray-600">
                        {formatTimestamp(record.updated)}
                      </span>
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
            <DialogTitle>Portal Record Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              {selectedRecord.conflict && (
                <div className="bg-[#FFF8E1] text-[#7B5915] text-sm rounded-md p-4 border border-[#F2AE40]">
                  ⚠️ This Portal Record contains conflicting data. Please review the details to understand discrepancies.
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Match Type:</span>
                <MatchTypeBadge type={selectedRecord.matchType} />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <FormField label="Portal Invoice Number" value={selectedRecord.invoiceNumber || 'N/A'} />
                <FormField label="Portal" value={selectedRecord.portal} />
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Portal Status</label>
                  <div className="flex items-center h-10 px-3 bg-gray-50 rounded-md border border-input">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <StatusBadge status={selectedRecord.portalStatus} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getStatusTooltip(selectedRecord.portalStatus)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <FormField label="Buyer" value={selectedRecord.buyer} />
                <FormField label="Total Amount" value={`${selectedRecord.currency === 'EUR' ? '€' : selectedRecord.currency === 'GBP' ? '£' : '$'}${selectedRecord.total.toLocaleString()}`} />
                <FormField label="Currency" value={selectedRecord.currency || "USD"} />
                <FormField label="PO Number" value={selectedRecord.poNumber} />
                <FormField label="Supplier Name" value={selectedRecord.supplierName} />
                <FormField label="Due Date" value={selectedRecord.dueDate || 'N/A'} />
                <FormField label="Net Terms" value={selectedRecord.netTerms || 'Net 30'} />
                <FormField label="Promise to Pay" value={selectedRecord.promiseToPay || 'N/A'} />
                <FormField label="Last Updated" value={formatDate(selectedRecord.updated)} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
