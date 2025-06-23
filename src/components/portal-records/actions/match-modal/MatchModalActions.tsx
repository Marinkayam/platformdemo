
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
  activeTab,
  selectedInvoiceId,
  uploadedFile,
  onIgnore,
  onMatch,
  onMatchAndCreateRTP,
}: MatchModalActionsProps) {
  return (
    <DialogFooter className="flex justify-between pt-6">
      <Button 
        variant="outline" 
        onClick={onIgnore} 
        className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
      >
        Ignore Record
      </Button>
      <div className="flex gap-3">
        {activeTab === "match-existing" ? (
          <Button 
            onClick={onMatch}
            disabled={!selectedInvoiceId}
            className={selectedInvoiceId ? "bg-primary hover:bg-primary/90" : ""}
          >
            Match Invoice
          </Button>
        ) : (
          <Button 
            onClick={onMatchAndCreateRTP}
            disabled={!uploadedFile}
            className={uploadedFile ? "bg-primary hover:bg-primary/90" : ""}
          >
            Match & Create RTP
          </Button>
        )}
      </div>
    </DialogFooter>
  );
}
