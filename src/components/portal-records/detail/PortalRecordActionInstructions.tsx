
import { PortalRecord } from "@/types/portalRecord";
import { InfoBanner } from "@/components/add-agent/components/InfoBanner";
import { Button } from "@/components/ui/button";

interface PortalRecordActionInstructionsProps {
  portalRecord: PortalRecord;
  onMatchInvoice?: () => void;
  onResolveConflict?: () => void;
  onSyncRecord?: () => void;
  onIgnoreRecord?: () => void;
}

export function PortalRecordActionInstructions({ 
  portalRecord, 
  onMatchInvoice,
  onResolveConflict,
  onSyncRecord,
  onIgnoreRecord
}: PortalRecordActionInstructionsProps) {
  // Only show instructions for connected records that have available actions
  if (portalRecord.connectionStatus !== 'Connected') {
    return null;
  }

  const getInstructionText = () => {
    if (portalRecord.matchType === 'Unmatched') {
      return 'This portal record needs attention. You can match it to an existing invoice, sync to get updated data, or ignore it if it\'s not relevant to your business.';
    } else if (portalRecord.matchType === 'Conflict') {
      return 'Multiple matches found for this record. Use Resolve Conflict to choose the correct match, or sync the record to refresh data from the portal.';
    } else {
      return 'Use Sync Record to refresh data from the portal if information appears outdated or if you need the latest updates.';
    }
  };

  const getActionButtons = () => {
    const buttons = [];

    if (portalRecord.matchType === 'Unmatched') {
      buttons.push(
        <Button key="match" onClick={onMatchInvoice} size="sm">
          Match Invoice
        </Button>
      );
      buttons.push(
        <Button key="ignore" variant="outline" onClick={onIgnoreRecord} size="sm" className="text-red-600 hover:text-red-700">
          Ignore Record
        </Button>
      );
    } else if (portalRecord.matchType === 'Conflict') {
      buttons.push(
        <Button key="resolve" onClick={onResolveConflict} size="sm">
          Resolve Conflict
        </Button>
      );
    }
    
    buttons.push(
      <Button key="sync" variant="outline" onClick={onSyncRecord} size="sm">
        Sync Record
      </Button>
    );

    return buttons;
  };

  return (
    <div className="bg-[#EBF1FF] border border-[#C7D9FF] rounded-lg p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className="h-5 w-5 text-[#253EA7] mt-0.5 flex-shrink-0">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-[#253EA7] text-sm leading-relaxed">{getInstructionText()}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {getActionButtons()}
        </div>
      </div>
    </div>
  );
}
