
import { PortalRecord } from "@/types/portalRecord";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface PortalRecordActionInstructionsProps {
  portalRecord: PortalRecord;
  onMatchInvoice?: () => void;
  onResolveConflict?: () => void;
  onIgnoreRecord?: () => void;
}

export function PortalRecordActionInstructions({ 
  portalRecord, 
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord
}: PortalRecordActionInstructionsProps) {
  // Only show instructions for connected records that have available actions
  if (portalRecord.connectionStatus !== 'Connected') {
    return null;
  }

  const getInstructionText = () => {
    if (portalRecord.matchType === 'Unmatched') {
      return 'This portal record needs attention. You can match it to an existing invoice or ignore it if it\'s not relevant to your business.';
    } else if (portalRecord.matchType === 'Conflict') {
      return 'Multiple matches found for this record. Use Resolve Conflict to choose the correct match.';
    } else {
      return null; // No instructions needed for matched records
    }
  };

  const getActionButtons = () => {
    const buttons = [];

    if (portalRecord.matchType === 'Unmatched') {
      buttons.push(
        <Button key="match" onClick={onMatchInvoice} size="sm" className="bg-[#7B59FF] hover:bg-[#6B46FF] text-white">
          Match
        </Button>
      );
      buttons.push(
        <Button key="ignore" variant="outline" onClick={onIgnoreRecord} size="sm" className="text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white">
          Ignore
        </Button>
      );
    } else if (portalRecord.matchType === 'Conflict') {
      buttons.push(
        <Button key="resolve" onClick={onResolveConflict} size="sm" className="bg-[#7B59FF] hover:bg-[#6B46FF] text-white">
          Resolve Conflict
        </Button>
      );
    }

    return buttons;
  };

  const instructionText = getInstructionText();
  const actionButtons = getActionButtons();

  // Don't render anything if there are no instructions or actions
  if (!instructionText && actionButtons.length === 0) {
    return null;
  }

  // Use orange banner for conflict records and blue for unmatched records
  const isConflict = portalRecord.matchType === 'Conflict';
  const bannerStyle = isConflict 
    ? "bg-orange-50 border border-orange-200" 
    : "bg-[#EBF1FF] border border-[#C7D9FF]";
  const iconStyle = isConflict ? "text-orange-600" : "text-[#253EA7]";
  const textStyle = isConflict ? "text-orange-700" : "text-[#253EA7]";

  return (
    <div className={`${bannerStyle} rounded-lg p-4`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className={`h-5 w-5 ${iconStyle} flex-shrink-0`}>
            <AlertCircle className="h-5 w-5" />
          </div>
          {instructionText && (
            <p className={`${textStyle} text-sm leading-relaxed`}>{instructionText}</p>
          )}
        </div>
        {actionButtons.length > 0 && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {actionButtons}
          </div>
        )}
      </div>
    </div>
  );
}
