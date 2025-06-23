
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
  const actions = [
    commonActions.view(() => onViewDetails(record.id))
  ];

  if (record.connectionStatus === 'Connected') {
    if (record.matchType === 'Unmatched') {
      actions.push({
        label: "Match Invoice",
        icon: Search,
        onClick: () => onMatchInvoice(record),
        variant: "default" as const
      });
      actions.push({
        label: "Ignore Record",
        icon: Ban,
        onClick: () => onIgnoreRecord(record),
        variant: "destructive" as const
      });
    } else if (record.matchType === 'Conflict') {
      actions.push({
        label: "Resolve Conflict",
        icon: AlertTriangle,
        onClick: () => onResolveConflict(record),
        variant: "default" as const
      });
    }
  }

  return <TableActions actions={actions} />;
}
