
import { PortalRecord } from "@/types/portalRecord";
import { InfoBanner } from "@/components/add-agent/components/InfoBanner";

interface PortalRecordActionInstructionsProps {
  portalRecord: PortalRecord;
}

export function PortalRecordActionInstructions({ portalRecord }: PortalRecordActionInstructionsProps) {
  // Only show instructions for connected records that have available actions
  if (portalRecord.connectionStatus !== 'Connected') {
    return null;
  }

  const getInstructionText = () => {
    if (portalRecord.matchType === 'Unmatched') {
      return (
        <>
          This portal record needs attention. You can <strong>match it to an existing invoice</strong>, <strong>sync to get updated data</strong>, or <strong>ignore it</strong> if it's not relevant to your business.
        </>
      );
    } else if (portalRecord.matchType === 'Conflict') {
      return (
        <>
          Multiple matches found for this record. Use <strong>Resolve Conflict</strong> to choose the correct match, or <strong>sync the record</strong> to refresh data from the portal.
        </>
      );
    } else {
      return (
        <>
          Use <strong>Sync Record</strong> to refresh data from the portal if information appears outdated or if you need the latest updates.
        </>
      );
    }
  };

  return (
    <InfoBanner>
      {getInstructionText()}
    </InfoBanner>
  );
}
