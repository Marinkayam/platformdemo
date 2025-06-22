
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EnhancedResolveConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onResolve: (selectedRecordId: string, action: 'primary' | 'alternate') => void;
}

export function EnhancedResolveConflictModal({ 
  isOpen, 
  onClose, 
  record, 
  onResolve 
}: EnhancedResolveConflictModalProps) {
  const [selectedRecord, setSelectedRecord] = useState<'current' | 'conflicting' | null>(null);

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
    poNumber: record.poNumber.replace('-', '_'), // Different PO format
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
        description: "Please select which record should be the primary match.",
        variant: "destructive",
      });
      return;
    }

    const selectedRecordId = selectedRecord === 'current' ? record.id : conflictingRecord.id;
    onResolve(selectedRecordId, 'primary');
    
    toast({
      title: "Conflict Resolved",
      description: `${selectedRecord === 'current' ? 'Current' : 'Conflicting'} record set as primary match.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Resolve Conflict - {record.portalRecordId}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Two portal records are linked to the same invoice. Select which record should be the primary match.
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700 text-sm font-medium">
                Multiple matches found for this record. Use Resolve Conflict to choose the correct match.
              </p>
            </div>
          </div>

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
                        <CardTitle className="text-lg text-gray-900">Current Primary</CardTitle>
                        <Badge variant="default">Primary</Badge>
                      </div>
                      {selectedRecord === 'current' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Portal Record ID</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {record.portalRecordId}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Total Amount</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {formatCurrency(record.total, record.currency)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">PO Number</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {record.poNumber}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Last Synced</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {formatDate(record.lastSynced)}
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
                        <CardTitle className="text-lg text-gray-900">Conflicting Record</CardTitle>
                        <Badge variant="outline" className="border-gray-300">Conflicting</Badge>
                      </div>
                      {selectedRecord === 'conflicting' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Portal Record ID</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {conflictingRecord.portalRecordId}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Total Amount</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {formatCurrency(conflictingRecord.total, conflictingRecord.currency)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">PO Number</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {conflictingRecord.poNumber}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Last Synced</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm">
                          {formatDate(conflictingRecord.lastSynced)}
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
              <strong>Note:</strong> The selected record will become the primary match and continue to be monitored. 
              The other record will become an alternate match and monitoring will stop.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleResolve} disabled={!selectedRecord}>
            Resolve Conflict
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
