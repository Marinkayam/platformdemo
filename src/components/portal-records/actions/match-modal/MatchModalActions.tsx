
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
  rtpInvoiceNumber,
  rtpInvoiceDate,
  onClose,
  onIgnore,
  onMatch,
  onMatchAndCreateRTP,
}: MatchModalActionsProps) {
  return (
    <DialogFooter className="flex justify-between pt-6">
      <Button 
        variant="outline" 
        onClick={onIgnore} 
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Ignore Record
      </Button>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose} className="text-gray-600">
          Cancel
        </Button>
        {activeTab === "match-existing" ? (
          <Button 
            onClick={onMatch}
            disabled={!selectedInvoiceId}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Match Invoice
          </Button>
        ) : (
          <Button 
            onClick={onMatchAndCreateRTP}
            disabled={!uploadedFile || !rtpInvoiceNumber.trim() || !rtpInvoiceDate}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Match & Create RTP
          </Button>
        )}
      </div>
    </DialogFooter>
  );
}
