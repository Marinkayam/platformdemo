
import { Button } from "@/components/ui/button";
import { PortalRecord } from "@/types/portalRecord";

interface PortalRecordDetailActionsProps {
  portalRecord: PortalRecord;
  onMatchInvoice: () => void;
  onResolveConflict: () => void;
  onIgnoreRecord: () => void;
}

export function PortalRecordDetailActions({
  portalRecord,
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord,
}: PortalRecordDetailActionsProps) {
  const getActionButtons = () => {
    const buttons = [];

    if (portalRecord.connectionStatus === 'Connected') {
      if (portalRecord.matchType === 'Unmatched') {
        buttons.push(
          <Button key="match" onClick={onMatchInvoice}>
            Match Invoice
          </Button>
        );
        buttons.push(
          <Button key="discard" variant="outline" onClick={onIgnoreRecord} className="text-red-600 hover:text-red-700">
            Discard Record
          </Button>
        );
      } else if (portalRecord.matchType === 'Conflict') {
        buttons.push(
          <Button key="resolve" onClick={onResolveConflict}>
            Resolve Conflict
          </Button>
        );
      }
    }

    return buttons;
  };

  return <>{getActionButtons()}</>;
}
