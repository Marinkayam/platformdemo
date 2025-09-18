
import { TableActions, commonActions } from "@/components/ui/table-actions";
import { PortalRecord } from "@/types/portalRecord";
import { Search, AlertTriangle, Ban } from "lucide-react";

interface ActionsColumnProps {
  record: PortalRecord;
  onViewDetails: (recordId: string) => void;
  onMatchInvoice: (record: PortalRecord) => void;
  onResolveConflict: (record: PortalRecord) => void;
  onIgnoreRecord: (record: PortalRecord) => void;
}

export function ActionsColumn({
  record,
  onViewDetails,
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord
}: ActionsColumnProps) {
  const actions = [];

  // Show appropriate action based on match type
  if (record.matchType === 'Unmatched') {
    actions.push({
      label: "Associate Invoice",
      icon: Search,
      onClick: () => onViewDetails(record.id),
      variant: "default" as const
    });
  } else if (record.matchType === 'Conflict') {
    actions.push({
      label: "Resolve Conflict",
      icon: AlertTriangle,
      onClick: () => onResolveConflict(record),
      variant: "default" as const,
      tooltip: "Review all linked invoices and select the correct one"
    });
  } else if (record.matchType === 'Primary' || record.matchType === 'Alternate') {
    // For Primary and Alternate matches, show "View Details"
    actions.push(commonActions.view(() => onViewDetails(record.id)));
  } else {
    // For any other match types, keep as "View Details"
    actions.push(commonActions.view(() => onViewDetails(record.id)));
  }

  // Show discard record option for conflict records
  if (record.matchType === 'Conflict') {
    actions.push({
      label: "Discard Record",
      icon: Ban,
      onClick: () => onIgnoreRecord(record),
      variant: "destructive" as const
    });
  } else if (['Connected', 'Syncing', 'Disconnected'].includes(record.connectionStatus)) {
    // Show remove invoice option for other actionable records
    actions.push({
      label: "Remove Invoice",
      icon: Ban,
      onClick: () => {
        console.log('Remove Invoice clicked for:', record.id);
        onIgnoreRecord(record);
      },
      variant: "destructive" as const
    });
  }

  return <TableActions actions={actions} />;
}
