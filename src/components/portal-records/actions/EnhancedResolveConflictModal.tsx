
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EnhancedIgnoreRecordModal } from "./EnhancedIgnoreRecordModal";

interface EnhancedResolveConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onResolve: (selectedRecordId: string, action: 'primary' | 'alternate') => void;
  onIgnore?: () => void;
}

export function EnhancedResolveConflictModal({ 
  isOpen, 
  onClose, 
  record, 
  onResolve,
  onIgnore
}: EnhancedResolveConflictModalProps) {
  const [selectedRecord, setSelectedRecord] = useState<'current' | 'conflicting' | null>(null);
  const [showIgnoreModal, setShowIgnoreModal] = useState(false);

  // Mock conflicting record data - in real app this would come from props
  const conflictingRecord = {
    id: `${record.id}-conflict`,
    portalRecordId: `${record.portalRecordId}-ALT`,
    portal: record.portal,
    buyer: record.buyer,
    portalStatus: record.portalStatus,
    invoiceNumber: record.invoiceNumber,
    matchType: 'Conflict' as const,
    total: record.total * 0.95, // Slightly different amount
    currency: record.currency,
    poNumber: record.poNumber?.replace('-', '_') || 'PO-ALT', // Different PO format
    supplierName: record.supplierName,
    connectionStatus: record.connectionStatus,
    lastSynced: "2024-01-15 10:30:00"
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleResolve = () => {
    if (!selectedRecord) {
      toast({
        title: "Selection Required",
        description: "Please select a resolution option.",
        variant: "destructive",
      });
      return;
    }

    const selectedRecordId = selectedRecord === 'current' ? record.id : conflictingRecord.id;
    onResolve(selectedRecordId, 'primary');

    toast({
      title: "Conflict Resolved",
      description: `Portal record ${record.portalRecordId} conflict has been resolved.`,
    });
    onClose();
  };

  const handleIgnore = () => {
    setShowIgnoreModal(true);
  };

  const handleIgnoreRecord = () => {
    if (onIgnore) {
      onIgnore();
    }
    setShowIgnoreModal(false);
    onClose();
  };

  const handleStopTrackingBuyer = () => {
    // This would typically be handled by a parent component
    console.log(`Stop tracking buyer: ${record.buyer}`);
    setShowIgnoreModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Resolve Conflict - {record.portalRecordId}
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Conflicts occur when multiple invoices are linked together. Review and select the correct one.
            </p>
          </DialogHeader>
          
          <div className="space-y-6">
            <RadioGroup 
              value={selectedRecord || ""} 
              onValueChange={(value) => setSelectedRecord(value as 'current' | 'conflicting')}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Current Primary Record */}
                <div className="relative">
                  <Card className="border-2 transition-all hover:shadow-md h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="current" id="current" />
                          <CardTitle className="text-lg text-gray-900">ERP Invoice</CardTitle>
                          <Badge variant="default">ERP</Badge>
                        </div>
                        {selectedRecord === 'current' && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </CardHeader>
                     <CardContent className="space-y-4">
                       <div className="space-y-3">
                         <div>
                           <label className="text-sm font-medium text-gray-500">ERP Invoice Number</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             {record.invoiceNumber || 'N/A'}
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">Buyer Name</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             {record.buyer}
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">Total Amount</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             {formatCurrency(record.total, record.currency)}
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">System Source</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             ERP
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">Current Status</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             Matched
                           </div>
                         </div>
                       </div>
                     </CardContent>
                  </Card>
                </div>

                {/* Conflicting Record */}
                <div className="relative">
                  <Card className="border-2 transition-all hover:shadow-md h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="conflicting" id="conflicting" />
                          <CardTitle className="text-lg text-gray-900">Portal Invoice</CardTitle>
                          <Badge variant="outline" className="border-gray-300">Portal</Badge>
                        </div>
                        {selectedRecord === 'conflicting' && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </CardHeader>
                     <CardContent className="space-y-4">
                       <div className="space-y-3">
                         <div>
                           <label className="text-sm font-medium text-gray-500">Portal Invoice Number</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             {record.portalRecordId}
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">Buyer Name</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             {conflictingRecord.buyer}
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">Total Amount</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             {formatCurrency(conflictingRecord.total, conflictingRecord.currency)}
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">System Source</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             Portal ({record.portal})
                           </div>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-gray-500">Current Status</label>
                           <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                             Pending
                           </div>
                         </div>
                       </div>
                     </CardContent>
                  </Card>
                </div>
              </div>
            </RadioGroup>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>User Interaction:</strong> The user must pick one record as the Primary.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {onIgnore && (
              <Button variant="destructive" onClick={handleIgnore}>
                Discard Record
              </Button>
            )}
            <Button onClick={handleResolve} disabled={!selectedRecord} className="bg-purple-600 hover:bg-purple-700">
              Confirm Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ignore Record Modal */}
      <EnhancedIgnoreRecordModal
        isOpen={showIgnoreModal}
        onClose={() => setShowIgnoreModal(false)}
        record={record}
        onIgnoreRecord={handleIgnoreRecord}
        onStopTrackingBuyer={handleStopTrackingBuyer}
      />
    </>
  );
}
