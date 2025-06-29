import { TriangleAlert } from "lucide-react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { StatusBadge } from "@/components/ui/status-badge";
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
      key: 'invoiceNumber',
      label: 'Invoice #',
      className: 'sticky left-0 z-10 bg-white border-r border-gray-100',
      render: (record: PortalRecord) => (
        <span className="text-sm text-gray-900 truncate cursor-pointer hover:underline" onClick={() => onViewDetails(record.id)}>
          {record.invoiceNumber}
        </span>
      )
    },
    {
      key: 'portal',
      label: 'Portal',
      className: 'truncate',
      render: (record: PortalRecord) => (
        <div className="flex items-center gap-2">
          <PortalLogo portalName={record.portal} className="w-4 h-4" />
          <span className="text-sm text-gray-900 truncate">{record.portal}</span>
        </div>
      )
    },
    {
      key: 'buyer',
      label: 'Buyer',
      className: 'truncate',
      render: (record: PortalRecord) => (
        <span className="text-sm text-gray-900 truncate">{record.buyer}</span>
      )
    },
    {
      key: 'portalStatus',
      label: 'Portal Status',  
      className: 'whitespace-nowrap',
      render: (record: PortalRecord) => <StatusBadge status={record.portalStatus} />
    },
    {
      key: 'total',
      label: 'Total',
      className: 'font-medium',
      render: (record: PortalRecord) => (
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(record.total, record.currency)}
        </span>
      )
    },
    {
      key: 'poNumber',
      label: 'PO #',
      className: 'truncate',
      render: (record: PortalRecord) => (
        <span className="text-sm text-gray-900 truncate">{record.poNumber}</span>
      )
    },
    {
      key: 'supplierName',
      label: 'Supplier Name',
      className: 'truncate',
      render: (record: PortalRecord) => (
        <span className="text-sm text-gray-900 truncate">{record.supplierName}</span>
      )
    },
    {
      key: 'matchType',
      label: 'Match Type',
      className: 'whitespace-nowrap',
      render: (record: PortalRecord) => <MatchTypeBadge type={record.matchType} />
    },
    {
      key: 'actions',
      label: '',
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
