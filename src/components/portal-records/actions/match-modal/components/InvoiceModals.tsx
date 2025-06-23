
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  number?: string;
}

interface InvoiceModalsProps {
  showPdfModal: boolean;
  setShowPdfModal: (show: boolean) => void;
  showMakePrimaryConfirm: boolean;
  setShowMakePrimaryConfirm: (show: boolean) => void;
  selectedInvoice: Invoice | undefined;
  record: PortalRecord;
  onMakePrimary?: () => void;
}

export function InvoiceModals({
  showPdfModal,
  setShowPdfModal,
  showMakePrimaryConfirm,
  setShowMakePrimaryConfirm,
  selectedInvoice,
  record,
  onMakePrimary,
}: InvoiceModalsProps) {
  const confirmMakePrimary = () => {
    if (onMakePrimary) {
      onMakePrimary();
    }
    toast({
      title: "Made Primary",
      description: `${record.portalRecordId} is now the primary record.`,
    });
    setShowMakePrimaryConfirm(false);
  };

  return (
    <>
      {/* PDF Preview Modal */}
      <Dialog open={showPdfModal} onOpenChange={setShowPdfModal}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice PDF Preview - {selectedInvoice?.number}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 border rounded-lg bg-gray-50 flex items-center justify-center min-h-[500px]">
            <div className="text-center text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">PDF Preview</p>
              <p className="text-sm">
                Invoice {selectedInvoice?.number} would be displayed here
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PDF viewer integration would be implemented here
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Make Primary Confirmation Modal */}
      <Dialog open={showMakePrimaryConfirm} onOpenChange={setShowMakePrimaryConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Primary Record?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to make <span className="font-mono text-foreground">{record.portalRecordId}</span> the primary record? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowMakePrimaryConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmMakePrimary}
                className="bg-primary hover:bg-primary/90"
              >
                Yes, Make Primary
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
