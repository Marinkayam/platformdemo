import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TriangleAlert, MoreVertical, Unlink } from "lucide-react";
import { invoiceSpecificRecords } from "@/data/portalRecords/invoiceSpecificData";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "@/components/portal-records/PortalLogo";
import { MatchTypeBadge } from "@/components/portal-records/MatchTypeBadge";
import { MakePrimaryConfirmModal } from "./MakePrimaryConfirmModal";
import { toast } from "@/hooks/use-toast";
import { StatusBadge } from "@/components/ui/status-badge";
import { FormField } from "@/components/ui/form-field";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PortalRecordsTabProps {
  invoiceId: string;
}

export function PortalRecordsTab({ invoiceId }: PortalRecordsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMakePrimaryModal, setShowMakePrimaryModal] = useState(false);
  const [showUnmatchConfirmModal, setShowUnmatchConfirmModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PortalRecord | null>(null);
  const [recordToUnmatch, setRecordToUnmatch] = useState<PortalRecord | null>(null);
  const [records, setRecords] = useState<PortalRecord[]>([]);

  // Filter and ensure we have at least one primary record
  useEffect(() => {
    console.log('Invoice ID:', invoiceId);
    console.log('All Invoice Specific Records:', invoiceSpecificRecords);
    
    let relevantRecords = invoiceSpecificRecords.filter(record => {
      console.log('Checking record:', record.id, 'invoiceNumber:', record.invoiceNumber, 'against invoiceId:', invoiceId);
      
      // Direct match with invoice ID
      if (record.invoiceNumber === invoiceId) return true;
      
      // Match with invoice number patterns - handle different formats
      const cleanInvoiceId = invoiceId.replace('INV-', '').replace(/^0+/, '');
      const cleanRecordNumber = record.invoiceNumber.replace('INV-', '').replace(/^0+/, '');
      
      // Try various matching patterns
      return cleanRecordNumber === cleanInvoiceId || 
             record.invoiceNumber === cleanInvoiceId ||
             cleanRecordNumber.padStart(8, '0') === cleanInvoiceId.padStart(8, '0') ||
             record.invoiceNumber.padStart(8, '0') === invoiceId.replace('INV-', '').padStart(8, '0');
    });

    console.log('Filtered relevant records:', relevantRecords);

    // If no records found, create a default primary record for this invoice
    if (relevantRecords.length === 0) {
      console.log('No records found, creating default record');
      const defaultRecord: PortalRecord = {
        id: `default-${invoiceId}`,
        portalRecordId: `PR-2024-${Math.floor(Math.random() * 9000) + 1000}`,
        portal: "Coupa",
        buyer: "Acme Corporation",
        portalStatus: "Approved by Buyer",
        invoiceNumber: `CP-INV-2024-${Math.floor(Math.random() * 9000) + 1000}`,
        matchType: "Primary",
        total: 2350.20,
        currency: "USD",
        poNumber: `PO-${invoiceId}-001`,
        supplierName: "Tech Solutions Inc.",
        connectionStatus: "Connected",
        lastSynced: new Date().toISOString(),
        status: "Approved",
        updated: new Date().toISOString(),
        conflict: false
      };
      relevantRecords = [defaultRecord];
    } else {
      // Ensure at least one primary record exists
      const hasPrimary = relevantRecords.some(r => r.matchType === "Primary");
      if (!hasPrimary && relevantRecords.length > 0) {
        // Make the first record primary
        relevantRecords[0] = { ...relevantRecords[0], matchType: "Primary" };
      }
    }

    console.log('Final records to display:', relevantRecords);
    setRecords(relevantRecords);
  }, [invoiceId]);


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
  const handleMakePrimary = (record: PortalRecord) => {
    setSelectedRecord(record);
    setShowMakePrimaryModal(true);
  };

  const confirmMakePrimary = () => {
    if (!selectedRecord) return;

    // Update records - make selected record primary and others alternate
    const updatedRecords = records.map(record => ({
      ...record,
      matchType: record.id === selectedRecord.id ? "Primary" as const : "Alternate" as const
    }));

    setRecords(updatedRecords);
    setShowMakePrimaryModal(false);
    setSelectedRecord(null);

    toast({
      title: "Primary Record Updated",
      description: `Portal record ${selectedRecord.portalRecordId} is now the primary record for this invoice.`,
      variant: "default",
    });
  };

  const handleViewDetails = (record: PortalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleUnmatchRecord = (record: PortalRecord) => {
    setRecordToUnmatch(record);
    setShowUnmatchConfirmModal(true);
  };

  const confirmUnmatchRecord = () => {
    if (!recordToUnmatch) return;

    console.log(`Unmatching record ${recordToUnmatch.id}`);

    const wasPrimary = recordToUnmatch.matchType === "Primary";

    // Remove the record from the list and potentially promote another
    setRecords(prevRecords => {
      const remainingRecords = prevRecords.filter(r => r.id !== recordToUnmatch.id);

      // If we removed the primary record and there are still records left
      if (wasPrimary && remainingRecords.length > 0) {
        // Promote the first record to Primary
        remainingRecords[0] = { ...remainingRecords[0], matchType: "Primary" };
      }

      return remainingRecords;
    });

    // Close modals
    setIsModalOpen(false);
    setShowUnmatchConfirmModal(false);
    setRecordToUnmatch(null);

    // Show success toast
    if (wasPrimary && records.length > 1) {
      toast({
        title: "Record Unmatched",
        description: `Portal record ${recordToUnmatch.invoiceNumber} has been unmatched. The next record has been promoted to Primary.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Record Unmatched",
        description: `Portal record ${recordToUnmatch.invoiceNumber} has been unmatched from this invoice.`,
        variant: "default",
      });
    }
  };

  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="text-center text-gray-600 py-10">
          No portal records found for this invoice.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          These records were pulled from buyer portals and linked to this invoice. Each record displays key invoice attributes and its current status in the portal.
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
                    Match Type
                  </th>
                  <th className="h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm font-sans">
                    Match Date
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
                      <PortalLogo portalName={record.portal} className="w-4 h-4" />
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
                        {format(new Date(record.lastSynced || record.updated), "MMM d, yyyy")}
                      </span>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans">
                      <span className="text-sm text-gray-600">
                        {format(new Date(record.updated), "MMM d, yyyy")}
                      </span>
                    </td>
                    <td className="h-[65px] px-4 align-middle text-sm font-normal font-sans" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUnmatchRecord(record);
                                  }}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Unlink className="mr-2 h-4 w-4" />
                                  Unmatch Record
                                </DropdownMenuItem>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove this portal record from the invoice</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Match Type:</span>
                  <MatchTypeBadge type={selectedRecord.matchType} />
                </div>
                {selectedRecord.matchType === "Alternate" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(false);
                      handleMakePrimary(selectedRecord);
                    }}
                    className="text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white"
                  >
                    Make as Primary
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <FormField label="Portal Invoice Number" value={selectedRecord.invoiceNumber} />
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
                <FormField label="Due Date" value={getDueDateDisplay(selectedRecord)} />
                <FormField label="Net Terms" value={getNetTermsDisplay(selectedRecord)} />
                <FormField label="Promise to Pay" value={getPromiseToPayDisplay(selectedRecord)} />
                <FormField label="Last Updated" value={format(new Date(selectedRecord.updated), "MMM d, yyyy")} />
              </div>
            </div>
          )}
          {selectedRecord && (
            <DialogFooter className="flex justify-end gap-2">
              <Button
                variant="destructive"
                onClick={() => handleUnmatchRecord(selectedRecord)}
                className="flex items-center gap-2"
              >
                <Unlink className="h-4 w-4" />
                Unmatch Record
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <MakePrimaryConfirmModal
        isOpen={showMakePrimaryModal}
        onClose={() => setShowMakePrimaryModal(false)}
        onConfirm={confirmMakePrimary}
        record={selectedRecord}
      />

      {/* Unmatch Confirmation Dialog */}
      <Dialog open={showUnmatchConfirmModal} onOpenChange={setShowUnmatchConfirmModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Unmatch Portal Record</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to unmatch this portal record from the invoice?
            </p>

            {recordToUnmatch && (
              <>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {recordToUnmatch.invoiceNumber}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Portal: {recordToUnmatch.portal}
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm font-medium text-amber-900 mb-2">What will happen:</p>
                  <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
                    <li>This portal record will be removed from the invoice</li>
                    {recordToUnmatch.matchType === "Primary" && records.length > 1 && (
                      <li className="font-medium">The next alternate record will be automatically promoted to Primary</li>
                    )}
                    {recordToUnmatch.matchType === "Primary" && records.length === 1 && (
                      <li className="font-medium">This invoice will no longer have any matched portal records</li>
                    )}
                    <li>You can re-match this record later if needed</li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowUnmatchConfirmModal(false);
                setRecordToUnmatch(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmUnmatchRecord}
              className="flex items-center gap-2"
            >
              <Unlink className="h-4 w-4" />
              Yes, Unmatch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
