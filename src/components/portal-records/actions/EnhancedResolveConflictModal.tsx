
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Circle } from "lucide-react";

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

  const getFieldComparison = (field: string, currentValue: any, conflictingValue: any) => {
    const isDifferent = currentValue !== conflictingValue;
    
    return {
      isDifferent,
      currentValue: currentValue || '—',
      conflictingValue: conflictingValue || '—'
    };
  };

  const fields = [
    { 
      key: 'portalRecordId', 
      label: 'Portal Record ID',
      current: record.portalRecordId,
      conflicting: conflictingRecord.portalRecordId
    },
    { 
      key: 'total', 
      label: 'Total Amount',
      current: formatCurrency(record.total, record.currency),
      conflicting: formatCurrency(conflictingRecord.total, conflictingRecord.currency)
    },
    { 
      key: 'poNumber', 
      label: 'PO Number',
      current: record.poNumber,
      conflicting: conflictingRecord.poNumber
    },
    { 
      key: 'lastSynced', 
      label: 'Last Synced',
      current: record.lastSynced,
      conflicting: conflictingRecord.lastSynced
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

          <div className="grid grid-cols-2 gap-6">
            {/* Current Primary Record */}
            <Card 
              className={`cursor-pointer transition-all ${
                selectedRecord === 'current' 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
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
              <CardContent className="space-y-3">
                {fields.map(field => {
                  const comparison = getFieldComparison(field.key, field.current, field.conflicting);
                  return (
                    <div key={field.key} className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">{field.label}:</span>
                      <span className={`text-sm ${comparison.isDifferent ? 'font-semibold text-blue-900' : 'text-gray-900'}`}>
                        {comparison.currentValue}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Conflicting Record */}
            <Card 
              className={`cursor-pointer transition-all ${
                selectedRecord === 'conflicting' 
                  ? 'ring-2 ring-orange-500 bg-orange-50' 
                  : 'hover:shadow-md'
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
              <CardContent className="space-y-3">
                {fields.map(field => {
                  const comparison = getFieldComparison(field.key, field.current, field.conflicting);
                  return (
                    <div key={field.key} className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">{field.label}:</span>
                      <span className={`text-sm ${comparison.isDifferent ? 'font-semibold text-orange-900' : 'text-gray-900'}`}>
                        {comparison.conflictingValue}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Field Differences Summary */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-base">Key Differences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {fields.map(field => {
                  const comparison = getFieldComparison(field.key, field.current, field.conflicting);
                  if (!comparison.isDifferent) return null;
                  
                  return (
                    <div key={field.key} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{field.label}:</span>
                      <div className="flex items-center gap-4">
                        <span className="text-blue-700 bg-blue-100 px-2 py-1 rounded">
                          {comparison.currentValue}
                        </span>
                        <span className="text-gray-400">vs</span>
                        <span className="text-orange-700 bg-orange-100 px-2 py-1 rounded">
                          {comparison.conflictingValue}
                        </span>
                      </div>
                    </div>
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
