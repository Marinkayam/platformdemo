
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface IgnoreRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onIgnore: () => void;
}

export function IgnoreRecordModal({ isOpen, onClose, record, onIgnore }: IgnoreRecordModalProps) {
  const handleIgnore = () => {
    onIgnore();
    toast({
      title: "Record Ignored",
      description: `Portal record ${record.portalRecordId} will no longer be monitored.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ignore Portal Record</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-900">
                    Are you sure you want to ignore this record?
                  </p>
                  <p className="text-sm text-orange-800">
                    Monto will stop monitoring portal record <strong>{record.portalRecordId}</strong> 
                    and it will no longer appear in your workspace.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Record Details</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div><strong>Portal:</strong> {record.portal}</div>
              <div><strong>Buyer:</strong> {record.buyer}</div>
              <div><strong>Amount:</strong> {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: record.currency
              }).format(record.total)}</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleIgnore}>
            Ignore Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
