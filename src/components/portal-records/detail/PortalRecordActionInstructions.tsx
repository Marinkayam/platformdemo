
import { PortalRecord } from "@/types/portalRecord";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { InlineMatchingInterface } from "../InlineMatchingInterface";

interface PortalRecordActionInstructionsProps {
  portalRecord: PortalRecord;
  onMatchInvoice?: (invoiceId?: string) => void;
  onResolveConflict?: () => void;
  onIgnoreRecord?: () => void;
}

export function PortalRecordActionInstructions({
  portalRecord,
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord
}: PortalRecordActionInstructionsProps) {
  // Show instructions for actionable records (Connected, Syncing, Disconnected)
  if (!['Connected', 'Syncing', 'Disconnected'].includes(portalRecord.connectionStatus)) {
    return null;
  }

  // For unmatched records, use the inline matching interface
  if (portalRecord.matchType === 'Unmatched') {
    return (
      <InlineMatchingInterface
        record={portalRecord}
        onMatchInvoice={(invoiceId) => onMatchInvoice?.(invoiceId)}
        onIgnoreRecord={() => onIgnoreRecord?.()}
      />
    );
  }

  const getInstructionText = () => {
    if (portalRecord.matchType === 'Conflict') {
      return 'Multiple matches found for this record. Use Resolve Conflict to choose the correct match.';
    } else {
      return null; // No instructions needed for matched records
    }
  };

  const getActionButtons = () => {
    const buttons = [];

    if (portalRecord.matchType === 'Conflict') {
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

  // Use orange banner for conflict records
  const bannerStyle = "bg-orange-50 border border-orange-200";
  const iconStyle = "text-orange-600";
  const textStyle = "text-orange-700";

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
