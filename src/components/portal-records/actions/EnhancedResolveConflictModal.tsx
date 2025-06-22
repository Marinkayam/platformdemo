
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

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

  const getFieldComparison = (currentValue: any, conflictingValue: any) => {
    return currentValue !== conflictingValue;
  };

  const ComparisonField = ({ 
    label, 
    currentValue, 
    conflictingValue, 
    isDifferent 
  }: { 
    label: string; 
    currentValue: string; 
    conflictingValue: string; 
    isDifferent: boolean; 
  }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2 font-medium text-gray-700">
        {isDifferent && <AlertCircle className="h-4 w-4 text-amber-500" />}
        <span>{label}</span>
      </div>
      <div className={`px-3 py-2 rounded-md text-sm ${
        isDifferent ? 'bg-blue-50 border border-blue-200 font-semibold text-blue-900' : 'bg-gray-50 text-gray-900'
      }`}>
        {currentValue}
      </div>
      <div className={`px-3 py-2 rounded-md text-sm ${
        isDifferent ? 'bg-orange-50 border border-orange-200 font-semibold text-orange-900' : 'bg-gray-50 text-gray-900'
      }`}>
        {conflictingValue}
      </div>
    </div>
  );

  const fields = [
    { 
      label: 'Portal Record ID',
      current: record.portalRecordId,
      conflicting: conflictingRecord.portalRecordId
    },
    { 
      label: 'Total Amount',
      current: formatCurrency(record.total, record.currency),
      conflicting: formatCurrency(conflictingRecord.total, conflictingRecord.currency)
    },
    { 
      label: 'PO Number',
      current: record.poNumber,
      conflicting: conflictingRecord.poNumber
    },
    { 
      label: 'Last Synced',
      current: formatDate(record.lastSynced),
      conflicting: formatDate(conflictingRecord.lastSynced)
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resolve Conflict - {record.portalRecordId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-medium text-red-900 mb-2">Conflict Detected</h3>
            <p className="text-red-700 text-sm">
              Two portal records are linked to the same invoice. Select which record should be the primary match.
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card 
              className={`cursor-pointer transition-all ${
                selectedRecord === 'current' 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md hover:border-blue-300'
              }`}
              onClick={() => setSelectedRecord('current')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-blue-900">Current Primary</CardTitle>
                  <div className="flex items-center gap-2">
                    {selectedRecord === 'current' ? (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <Badge variant="default">Primary</Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                selectedRecord === 'conflicting' 
                  ? 'ring-2 ring-orange-500 bg-orange-50' 
                  : 'hover:shadow-md hover:border-orange-300'
              }`}
              onClick={() => setSelectedRecord('conflicting')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-orange-900">Conflicting Record</CardTitle>
                  <div className="flex items-center gap-2">
                    {selectedRecord === 'conflicting' ? (
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <Badge variant="outline" className="border-orange-300 text-orange-700">Conflicting</Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Enhanced Comparison Table */}
          <Card className="bg-white">
            <CardHeader>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold text-gray-900">Field</div>
                <div className="font-semibold text-blue-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Current Primary
                </div>
                <div className="font-semibold text-orange-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Conflicting Record
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-0">
                {fields.map(field => {
                  const isDifferent = getFieldComparison(field.current, field.conflicting);
                  return (
                    <ComparisonField
                      key={field.label}
                      label={field.label}
                      currentValue={field.current}
                      conflictingValue={field.conflicting}
                      isDifferent={isDifferent}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
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
