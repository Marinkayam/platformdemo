
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2, Ban } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PortalLogo } from "../PortalLogo";
import { StatusBadge } from "@/components/ui/status-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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
  onStopTrackingBuyer 
}: EnhancedIgnoreRecordModalProps) {
  const [selectedOption, setSelectedOption] = useState<'record' | 'buyer' | null>(null);
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [showBuyerConfirmModal, setShowBuyerConfirmModal] = useState(false);

  useEffect(() => {
    console.log('EnhancedIgnoreRecordModal props:', {
      isOpen,
      recordId: record?.id,
      recordBuyer: record?.buyer
    });
    if (isOpen && record) {
      console.log('Modal should be visible now with record:', record);
    } else if (isOpen && !record) {
      console.log('ERROR: Modal is open but no record provided!');
    }
  }, [isOpen, record]);

  useEffect(() => {
    console.log('showBuyerConfirmModal state changed to:', showBuyerConfirmModal);
  }, [showBuyerConfirmModal]);

  const handleConfirm = () => {
    console.log('Confirm button clicked with option:', selectedOption);
    if (selectedOption === 'record') {
      // Show toast first, then close after a small delay
      console.log('Showing toast for Discard Invoice');
      toast.success("Invoice Discarded", {
        description: `Invoice ${record.portalRecordId} has been successfully discarded. Returning to portal records...`,
      });
      console.log('Toast shown');
      setTimeout(() => {
        onIgnoreRecord();
        onClose();
      }, 100);
    } else if (selectedOption === 'buyer') {
      // Show confirmation modal for excluding buyer
      console.log('Setting showBuyerConfirmModal to true');
      setShowBuyerConfirmModal(true);
    }
  };

  const handleConfirmExcludeBuyer = () => {
    console.log('handleConfirmExcludeBuyer called');
    setShowBuyerConfirmModal(false);

    // Show toast first
    console.log('Showing toast for Exclude Buyer');
    toast.warning("Buyer Excluded", {
      description: `All invoices from ${record.buyer} have been blocked. Returning to portal records...`,
    });
    console.log('Toast shown');

    // Then close modals and execute callback after a small delay
    setTimeout(() => {
      onStopTrackingBuyer();
      onClose();
    }, 100);
  };

  const handleClose = () => {
    console.log('Modal closing, resetting selectedOption');
    setSelectedOption(null);
    setConfirmationChecked(false);
    setShowBuyerConfirmModal(false);
    onClose();
  };

  if (!record) {
    console.log('No record provided to EnhancedIgnoreRecordModal');
    return null;
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
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
              <div className="flex items-center pt-2">
                <StatusBadge status={record.portalStatus} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
            <Card
              className={`cursor-pointer transition-all ${
                selectedOption === 'record'
                  ? 'border-primary-main border-2'
                  : 'border-grey-400 hover:border-primary-main/30 hover:shadow-sm'
              }`}
              onClick={() => setSelectedOption('record')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 border border-red-200">
                    <Trash2 className="h-3 w-3 text-red-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Discard Invoice
                    </h4>
                    <p className="text-sm text-gray-600">
                      Only this specific invoice will be discarded from matching. Other invoices from {record.buyer} will continue as normal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all ${
                selectedOption === 'buyer'
                  ? 'border-primary-main border-2'
                  : 'border-grey-400 hover:border-primary-main/30 hover:shadow-sm'
              }`}
              onClick={() => setSelectedOption('buyer')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 border border-red-200">
                    <Ban className="h-3 w-3 text-red-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Exclude Buyer
                    </h4>
                    <p className="text-sm text-gray-600">
                      All invoices from this buyer will be excluded from automatic matching. You can re-enable later if needed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedOption}
            variant={!selectedOption ? 'outline' : 'destructive'}
            className={`${
              !selectedOption
                ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed text-white border-gray-400'
                : 'bg-[#DF1C41] hover:bg-[#C41838] text-white border-[#DF1C41]'
            }`}
          >
            {selectedOption === 'record'
              ? 'Discard Invoice'
              : selectedOption === 'buyer'
              ? 'Exclude Buyer'
              : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Exclude Buyer Confirmation Modal - Using Portal */}
    {showBuyerConfirmModal && createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBuyerConfirmModal(false)} />
        <div className="relative max-w-md w-full mx-4 bg-white rounded-lg shadow-2xl border-2 p-6 space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Buyer Exclusion</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-900 leading-relaxed">
                Are you sure you want to block all current and future invoices from <strong className="font-semibold">{record?.buyer}</strong>?
              </p>
              <p className="text-sm text-gray-600">
                This will disable automatic matching for this buyer.
              </p>
            </div>
          </div>

          <div className="py-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">This action will:</p>
                  <ul className="space-y-1 text-amber-700">
                    <li>• Block all invoices from this buyer</li>
                    <li>• Disable automatic matching</li>
                    <li>• Require manual re-enabling in settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Cancel clicked');
                setShowBuyerConfirmModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Yes, Exclude Buyer clicked');
                handleConfirmExcludeBuyer();
              }}
              variant="destructive"
              className="bg-[#DF1C41] hover:bg-[#C41838] text-white border-[#DF1C41]"
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}
            >
              Yes, Exclude Buyer
            </Button>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
