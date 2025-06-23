
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { PortalRecordIdColumn } from "./columns/PortalRecordIdColumn";
import { PortalStatusColumn } from "./columns/PortalStatusColumn";
import { ActionsColumn } from "./columns/ActionsColumn";

interface PortalRecordsTableColumnsProps {
  onViewDetails: (recordId: string) => void;
  onMatchInvoice: (record: PortalRecord) => void;
  onResolveConflict: (record: PortalRecord) => void;
  onIgnoreRecord: (record: PortalRecord) => void;
}

export function usePortalRecordsTableColumns({
  onViewDetails,
  onMatchInvoice,
  onResolveConflict,
  onIgnoreRecord
}: PortalRecordsTableColumnsProps) {
  const getDisplayValue = (record: PortalRecord, field: keyof PortalRecord): string => {
    if (record.connectionStatus === 'Disconnected' && !['portal', 'portalRecordId'].includes(field)) {
      return "—";
    }

    const value = record[field] as string;
    
    if (!value || value === "—") {
      return "—";
    }

    return value;
  };

  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return [
    {
      key: "portalRecordId",
      label: "Portal Record ID",
      sticky: true,
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <PortalRecordIdColumn record={record} />
      )
    },
    {
      key: "portal",
      label: "Portal",
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <PortalLogo portalName={record.portal} />
      )
    },
    {
      key: "buyer",
      label: "Buyer",
      className: "w-[12%]",
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'buyer');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "portalStatus",
      label: "Portal Status",
      className: "w-[10%]",
      render: (record: PortalRecord) => (
        <PortalStatusColumn record={record} />
      )
    },
    {
      key: "invoiceNumber",
      label: "Invoice #",
      className: "w-[10%]",
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'invoiceNumber');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "matchType",
      label: "Match Type",
      className: "w-[10%]",
      render: (record: PortalRecord) => {
        if (record.connectionStatus === 'Disconnected') {
          return <span className="text-gray-400">—</span>;
        }
        return <MatchTypeBadge type={record.matchType} />;
      }
    },
    {
      key: "total",
      label: "Total",
      className: "w-[10%]",
      render: (record: PortalRecord) => {
        if (record.connectionStatus === 'Disconnected' || record.total === 0) {
          return <span className="text-gray-400">—</span>;
        }
        return (
          <span className="text-gray-600 font-medium">
            {formatCurrency(record.total, record.currency)}
          </span>
        );
      }
    },
    {
      key: "poNumber",
      label: "PO #",
      className: "w-[10%]",
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'poNumber');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "supplierName",
      label: "Supplier Name",
      className: "w-[12%]",
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'supplierName');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-[7%] text-center",
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
