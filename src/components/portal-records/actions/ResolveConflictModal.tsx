
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";

interface ResolveConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onResolve: (resolution: string) => void;
}

export function ResolveConflictModal({ isOpen, onClose, record, onResolve }: ResolveConflictModalProps) {
  const [selectedResolution, setSelectedResolution] = useState("");

  const handleResolve = () => {
    if (!selectedResolution) {
      toast({
        title: "Selection Required",
        description: "Please select a resolution option.",
        variant: "destructive",
      });
      return;
    }

    onResolve(selectedResolution);
    toast({
      title: "Conflict Resolved",
      description: `Portal record ${record.portalRecordId} conflict has been resolved.`,
    });
    onClose();
  };

  const mockConflicts = [
    {
      field: "Total Amount",
      portalValue: new Intl.NumberFormat('en-US', { style: 'currency', currency: record.currency }).format(record.total),
      erpValue: new Intl.NumberFormat('en-US', { style: 'currency', currency: record.currency }).format(record.total * 0.95)
    },
    {
      field: "PO Number",
      portalValue: record.poNumber,
      erpValue: record.poNumber.replace('-', '_')
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Resolve Conflict - {record.portalRecordId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-medium text-red-900 mb-2">Data Conflicts Detected</h3>
            <p className="text-red-700 text-sm">
              The following fields have conflicting values between the portal record and ERP system:
            </p>
          </div>

          <div className="space-y-4">
            {mockConflicts.map((conflict, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">{conflict.field}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm font-medium text-blue-900">Portal Value</p>
                    <p className="text-blue-800">{conflict.portalValue}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="text-sm font-medium text-orange-900">ERP Value</p>
                    <p className="text-orange-800">{conflict.erpValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Resolution Options</Label>
            <RadioGroup value={selectedResolution} onValueChange={setSelectedResolution}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accept-portal" id="accept-portal" />
                <Label htmlFor="accept-portal">Accept Portal Values (Update ERP)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accept-erp" id="accept-erp" />
                <Label htmlFor="accept-erp">Accept ERP Values (Update Portal Record)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual-review" id="manual-review" />
                <Label htmlFor="manual-review">Flag for Manual Review</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleResolve}>
            Resolve Conflict
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
