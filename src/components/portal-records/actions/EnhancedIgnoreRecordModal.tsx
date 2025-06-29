
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface EnhancedIgnoreRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
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

  const handleConfirm = () => {
    if (selectedOption === 'record') {
      onIgnoreRecord();
      toast({
        title: "Record Ignored",
        description: `Portal record ${record.portalRecordId} will no longer be monitored.`,
      });
    } else if (selectedOption === 'buyer') {
      onStopTrackingBuyer();
      toast({
        title: "Buyer Tracking Stopped",
        description: `Monto will stop pulling future data from ${record.buyer}'s portal.`,
      });
    }
    onClose();
  };

  const handleClose = () => {
    setSelectedOption(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>How would you like to handle this record?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Not every portal record needs to be tracked. Choose how you'd like Monto to handle it:
          </p>

          <div className="space-y-3">
            <Card 
              className={`cursor-pointer transition-colors ${
                selectedOption === 'record' 
                  ? 'border-[#7B59FF] bg-[#EFEBFF]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedOption('record')}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="ignoreOption"
                    checked={selectedOption === 'record'}
                    onChange={() => setSelectedOption('record')}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">Ignore this record only</h4>
                    <p className="text-sm text-gray-600">
                      We'll skip just this single portal record—everything else stays in sync.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-colors ${
                selectedOption === 'buyer' 
                  ? 'border-[#7B59FF] bg-[#EFEBFF]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedOption('buyer')}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="ignoreOption"
                    checked={selectedOption === 'buyer'}
                    onChange={() => setSelectedOption('buyer')}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">Stop tracking this buyer</h4>
                    <p className="text-sm text-gray-600">
                      Monto will stop pulling any future data from this buyer's portal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedOption}
            className="bg-[#7B59FF] hover:bg-[#6A4DEE]"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
