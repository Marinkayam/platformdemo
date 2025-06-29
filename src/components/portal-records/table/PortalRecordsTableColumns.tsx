
import { TriangleAlert } from "lucide-react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { PortalStatusBadge } from "../PortalStatusBadge";
import { ConnectionStatusBadge } from "../ConnectionStatusBadge";
import { LastSyncedCell } from "../LastSyncedCell";
import { ActionsColumn } from "./columns/ActionsColumn";
import { formatCurrency } from "@/lib/utils";

interface PortalRecordsTableColumnsProps {
  onViewDetails: (recordId: string) => void;
  onMatchInvoice: (record: PortalRecord) => void;
  onResolveConflict: (record: PortalRecord) => void;
  onIgnoreRecord: (record: PortalRecord) => void;
}

export function usePortalRecordsTableColumns({ onViewDetails, onMatchInvoice, onResolveConflict, onIgnoreRecord }: PortalRecordsTableColumnsProps) {
  return [
    {
      key: 'portalRecordId',
      label: 'Portal Record ID',
      className: 'sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold',
      render: (record: PortalRecord) => (
        <div className="flex items-center gap-2">
          {record.conflict && (
            <TriangleAlert className="w-4 h-4 text-[#FF9800]" />
          )}
          <span className="text-sm font-medium text-black truncate">
            {record.portalRecordId}
          </span>
        </div>
      )
    },
    {
      key: 'buyer',
      label: 'Buyer',
      className: 'truncate',
      render: (record: PortalRecord) => (
        <div className="flex items-center gap-2">
          <PortalLogo portalName={record.portal} className="w-4 h-4" />
          <span className="text-sm text-gray-900 truncate">{record.buyer}</span>
        </div>
      )
    },
    {
      key: 'matchType',
      label: 'Match Type',
      className: 'whitespace-nowrap',
      render: (record: PortalRecord) => <MatchTypeBadge matchType={record.matchType} />
    },
    {
      key: 'portalStatus',
      label: 'Portal Status',  
      className: 'whitespace-nowrap',
      render: (record: PortalRecord) => <PortalStatusBadge status={record.portalStatus} />
    },
    {
      key: 'total',
      label: 'Amount',
      className: 'font-medium',
      render: (record: PortalRecord) => (
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(record.total, record.currency)}
        </span>
      )
    },
    {
      key: 'connectionStatus',
      label: 'Connection',
      className: 'whitespace-nowrap',
      render: (record: PortalRecord) => <ConnectionStatusBadge status={record.connectionStatus} />
    },
    {
      key: 'lastSynced',
      label: 'Last Synced',
      className: 'whitespace-nowrap',
      render: (record: PortalRecord) => <LastSyncedCell lastSynced={record.lastSynced} />
    },
    {
      key: 'actions',
      label: 'Actions',
      className: 'text-right',
      render: (record: PortalRecord) => (
        <ActionsColumn
          record={record}
          onViewDetails={onViewDetails}
          onMatchInvoice={onMatchInvoice}
          onResolveConflict={onResolveConflict}
          onIgnoreRecord={onIgnoreRecord}
        />
      )
    }
  ];
}
