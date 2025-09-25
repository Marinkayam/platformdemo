import React, { useState } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, X } from "lucide-react";

interface ConflictResolutionInterfaceProps {
  record: PortalRecord;
  onResolvePrimary: (selectedRecordId: string) => void;
  onDiscardRecord: () => void;
}

// Mock conflicting records - in real app this would come from API
const generateConflictingRecords = (mainRecord: PortalRecord) => {
  return [
    {
      id: "conflict-1",
      type: "Portal Record",
      source: "Coupa",
      invoiceNumber: mainRecord.invoiceNumber || "INV-00005555",
      buyer: mainRecord.buyer,
      amount: mainRecord.total,
      currency: mainRecord.currency,
      status: "Approved by Buyer",
      warningType: "Multiple ERP Matches",
      conflictReason: "Multiple ERP Matches"
    },
    {
      id: "conflict-2",
      type: "ERP Invoice",
      source: "NetSuite",
      invoiceNumber: "NS-12345",
      buyer: mainRecord.buyer,
      amount: mainRecord.total,
      currency: mainRecord.currency,
      warningType: "Duplicate Match",
      conflictReason: "Duplicate Match"
    },
    {
      id: "conflict-3",
      type: "ERP Invoice",
      source: "NetSuite",
      invoiceNumber: "NS-12346",
      buyer: mainRecord.buyer,
      amount: mainRecord.total + 50, // Slightly different amount
      currency: mainRecord.currency,
      warningType: "Amount Mismatch",
      conflictReason: "Amount Mismatch"
    }
  ];
};

export function ConflictResolutionInterface({
  record,
  onResolvePrimary,
  onDiscardRecord
}: ConflictResolutionInterfaceProps) {
  const [selectedRecordId, setSelectedRecordId] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const conflictingRecords = generateConflictingRecords(record);

  const handleSelectPrimary = () => {
    if (selectedRecordId) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmResolution = () => {
    onResolvePrimary(selectedRecordId);
    setShowConfirmation(false);
  };

  const handleDiscardAll = () => {
    setShowDiscardConfirmation(true);
  };

  const handleConfirmDiscard = () => {
    onDiscardRecord();
    setShowDiscardConfirmation(false);
  };

  const selectedRecord = conflictingRecords.find(r => r.id === selectedRecordId);
  const otherRecords = conflictingRecords.filter(r => r.id !== selectedRecordId);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Resolve Conflict</h3>
        <p className="text-sm text-gray-600">
          Choose one record as Primary. Others will be discarded.
        </p>
      </div>


      {/* Conflicting Records Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conflictingRecords.map((conflictRecord) => {
          const isSelected = selectedRecordId === conflictRecord.id;
          return (
            <div key={conflictRecord.id} className="space-y-0">
              <div
                className={`relative p-4 rounded-lg border transition-all shadow-sm cursor-pointer ${
                  isSelected
                    ? 'border-primary border-2 bg-white'
                    : 'border-gray-200 hover:border-primary/30 hover:shadow-md bg-white'
                }`}
                onClick={() => setSelectedRecordId(conflictRecord.id)}
              >
                <div className="space-y-3">
                  {/* Record details */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-500 font-medium">Invoice Number</span>
                      <p className="text-sm font-bold text-gray-900">{conflictRecord.invoiceNumber}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-medium">Buyer</span>
                      <p className="text-sm text-gray-700">{conflictRecord.buyer}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-medium">Total Amount</span>
                      <p className="text-sm text-gray-700">
                        {formatCurrency(conflictRecord.amount, conflictRecord.currency)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-medium">Currency</span>
                      <p className="text-sm text-gray-700">{conflictRecord.currency}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-medium">Portal</span>
                      <p className="text-sm text-gray-700">{conflictRecord.source}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-medium">Type</span>
                      <p className="text-sm text-gray-700">{conflictRecord.type}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          onClick={handleDiscardAll}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Discard All Records
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleSelectPrimary}
            disabled={!selectedRecordId}
            className="bg-primary hover:bg-primary/90"
          >
            Confirm Resolution
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle>Are you sure you want to set as primary record?</DialogTitle>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-6">
              {/* Primary Record Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Invoice Number</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                    {selectedRecord.invoiceNumber}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Buyer</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                    {selectedRecord.buyer}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Amount</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                    {formatCurrency(selectedRecord.amount, selectedRecord.currency)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Portal</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                    {selectedRecord.source}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                    {selectedRecord.type}
                  </div>
                </div>
              </div>

              {/* Records to be discarded */}
              {otherRecords.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-red-600">
                    {otherRecords.length} record{otherRecords.length > 1 ? 's' : ''} will be discarded:
                  </h4>
                  <div className="space-y-2">
                    {otherRecords.map((discardRecord) => (
                      <div key={discardRecord.id} className="border border-red-200 rounded-lg p-3 bg-red-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Invoice Number</span>
                            <p className="text-sm font-semibold text-gray-900">{discardRecord.invoiceNumber}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Buyer</span>
                            <p className="text-sm text-gray-700">{discardRecord.buyer}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Amount</span>
                            <p className="text-sm text-gray-700">{formatCurrency(discardRecord.amount, discardRecord.currency)}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Portal</span>
                            <p className="text-sm text-gray-700">{discardRecord.source}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmResolution}>
                  Set as Primary
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Discard All Records Confirmation Dialog */}
      <Dialog open={showDiscardConfirmation} onOpenChange={setShowDiscardConfirmation}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle>Are you sure you want to discard all records?</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-gray-700 text-sm">
              This action will permanently discard these records. They will no longer be used for matching.
            </p>

            {/* All Records to be discarded */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-red-600">
                {conflictingRecords.length} record{conflictingRecords.length > 1 ? 's' : ''} will be discarded:
              </h4>
              <div className="space-y-2">
                {conflictingRecords.map((discardRecord) => (
                  <div key={discardRecord.id} className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 font-medium">Invoice Number</span>
                        <p className="text-sm font-semibold text-gray-900">{discardRecord.invoiceNumber}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium">Buyer</span>
                        <p className="text-sm text-gray-700">{discardRecord.buyer}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium">Amount</span>
                        <p className="text-sm text-gray-700">{formatCurrency(discardRecord.amount, discardRecord.currency)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium">Portal</span>
                        <p className="text-sm text-gray-700">{discardRecord.source}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDiscardConfirmation(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDiscard}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Discard All Records
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}