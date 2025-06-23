
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface MatchModalActionsProps {
  activeTab: string;
  selectedInvoiceId: string;
  uploadedFile: File | null;
  rtpInvoiceNumber: string;
  rtpInvoiceDate: string;
  onClose: () => void;
  onIgnore: () => void;
  onMatch: () => void;
  onMatchAndCreateRTP: () => void;
}

export function MatchModalActions({
  selectedInvoiceId,
  uploadedFile,
  onIgnore,
  onMatch,
  onMatchAndCreateRTP,
}: MatchModalActionsProps) {
  // Determine which action to show based on available data
  const canMatchInvoice = selectedInvoiceId;
  const canCreateRTP = uploadedFile;

  return (
    <DialogFooter className="flex justify-between items-center pt-4 border-t bg-background">
      <Button 
        variant="outline" 
        onClick={onIgnore} 
        className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
      >
        Ignore Record
      </Button>
      <div className="flex gap-3">
        {canMatchInvoice && (
          <Button 
            onClick={onMatch}
            className="bg-primary hover:bg-primary/90"
          >
            Match Invoice
          </Button>
        )}
        {canCreateRTP && (
          <Button 
            onClick={onMatchAndCreateRTP}
            className="bg-primary hover:bg-primary/90"
          >
            Match & Create RTP
          </Button>
        )}
        {!canMatchInvoice && !canCreateRTP && (
          <Button 
            disabled
            variant="outline"
            className="opacity-50 cursor-not-allowed"
          >
            Select an invoice or upload a PDF
          </Button>
        )}
      </div>
    </DialogFooter>
  );
}
