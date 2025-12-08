
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "sonner";
import { PortalLogo } from "../PortalLogo";

interface EnhancedIgnoreRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord | null;
  onIgnoreRecord: () => void;
  onStopTrackingBuyer: () => void;
}

export function EnhancedIgnoreRecordModal({
  isOpen,
  onClose,
  record,
  onIgnoreRecord,
  onStopTrackingBuyer,
}: EnhancedIgnoreRecordModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Reset step when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!record) {
    return null;
  }

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {step === 1 ? (
          <>
            <DialogHeader className="space-y-4">
              <DialogTitle>How do you want to handle this record?</DialogTitle>
              <DialogDescription>
                You can remove just this invoice, or exclude this buyer from future automatic matching.
              </DialogDescription>
            </DialogHeader>

            {/* Record Details - Form Input Style */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#01173E]">Invoice Number</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-[#586079] font-mono">
                    {record.invoiceNumber}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#01173E]">Amount</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-[#586079]">
                    {record.total ? new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: record.currency || 'USD',
                    }).format(record.total) : '—'}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#01173E]">Buyer</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-[#586079]">
                    {record.buyer}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#01173E]">Portal</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-[#586079] flex items-center gap-2">
                    <PortalLogo portalName={record.portal} className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {record.supplierName && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#01173E]">Supplier</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-[#586079]">
                      {record.supplierName}
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#01173E]">Status</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-[#586079]">
                    {record.portalStatus}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                variant="destructive"
                className="bg-[#DF1C41] hover:bg-[#C41838] text-white border-[#DF1C41]"
              >
                Discard Invoice
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="space-y-4">
              <DialogTitle>Choose an action</DialogTitle>
              <DialogDescription>
                Select how you want to handle invoice <span className="font-medium">{record.invoiceNumber}</span> from <span className="font-medium">{record.buyer}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              {/* Discard Invoice Option */}
              <button
                onClick={() => {
                  toast.success("Invoice Discarded", {
                    description: `Invoice ${record.portalRecordId} has been successfully discarded.`,
                  });
                  setTimeout(() => {
                    onIgnoreRecord();
                    handleClose();
                  }, 100);
                }}
                className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#DF1C41] hover:bg-[#DF1C41]/5 transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DF1C41]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#DF1C41]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF1C41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      <line x1="10" x2="10" y1="11" y2="17"/>
                      <line x1="14" x2="14" y1="11" y2="17"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#01173E]">Discard this invoice only</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Remove this specific invoice from the queue. Future invoices from this buyer will still be matched.
                    </p>
                  </div>
                </div>
              </button>

              {/* Exclude Buyer Option */}
              <button
                onClick={() => {
                  toast.success("Buyer Excluded", {
                    description: `${record.buyer} has been excluded from future automatic matching.`,
                  });
                  setTimeout(() => {
                    onStopTrackingBuyer();
                    handleClose();
                  }, 100);
                }}
                className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#DF1C41] hover:bg-[#DF1C41]/5 transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DF1C41]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#DF1C41]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF1C41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m4.9 4.9 14.2 14.2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#01173E]">Exclude this buyer</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Stop tracking all invoices from <span className="font-medium">{record.buyer}</span>. This invoice and all future invoices from this buyer will be ignored.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
