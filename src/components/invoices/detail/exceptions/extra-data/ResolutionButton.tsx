
import { Button } from "@/components/ui/button";

interface ResolutionButtonProps {
  selectedAction: string | null;
  invoiceDate: string;
  customerName: string;
  uploadedFile: File | null;
  isUploading: boolean;
  onResolve: () => void;
}

export function ResolutionButton({
  selectedAction,
  invoiceDate,
  customerName,
  uploadedFile,
  isUploading,
  onResolve,
}: ResolutionButtonProps) {
  const getButtonText = () => {
    if (selectedAction === 'upload') {
      return 'Upload New RTP';
    } else if (selectedAction === 'force_submit') {
      return 'Force Submit';
    } else if (selectedAction === 'exclude') {
      return 'Exclude Invoice';
    } else if (selectedAction === 'resolve_outside') {
      return 'Mark as Resolved';
    } else if (invoiceDate && customerName) {
      return 'Resolve with Manual Data';
    }
    return 'Resolve Exception';
  };

  const isButtonEnabled = () => {
    if (selectedAction === 'upload') {
      return uploadedFile !== null && !isUploading;
    }
    if (selectedAction) {
      return true;
    }
    return invoiceDate && customerName;
  };

  return (
    <div className="mt-6 flex justify-end">
      <Button 
        onClick={onResolve}
        className="px-6"
        disabled={!isButtonEnabled()}
      >
        {getButtonText()}
      </Button>
    </div>
  );
}
