import { TriangleAlert } from "lucide-react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { StatusBadge } from "@/components/ui/status-badge";
import { ConnectionStatusBadge } from "../ConnectionStatusBadge";
import { LastSyncedCell } from "../LastSyncedCell";
import { ActionsColumn } from "./columns/ActionsColumn";
import { ConflictStatusBadge } from "../ConflictStatusBadge";
import { formatCurrency } from "@/lib/utils";

interface PortalRecordsTableColumnsProps {
   onViewDetails: (recordId: string) => void;
   onMatchInvoice: (record: PortalRecord) => void;
   onResolveConflict: (record: PortalRecord) => void;
   onIgnoreRecord: (record: PortalRecord) => void;
   activeTab?: string;
 }

export function usePortalRecordsTableColumns({ onViewDetails, onMatchInvoice, onResolveConflict, onIgnoreRecord, activeTab }: PortalRecordsTableColumnsProps) {
  const baseColumns = [
     {
       key: 'invoiceNumber',
       label: 'Portal Invoice Number',
       className: 'sticky left-0 z-10 bg-white border-r border-gray-200 w-[200px] min-w-[200px] whitespace-nowrap',
       render: (record: PortalRecord) => {
         const invoiceNumber = record.invoiceNumber;
         const shouldBeSemiBold = invoiceNumber.toLowerCase().startsWith('inv-') || invoiceNumber.toLowerCase().startsWith('cp-');

         return (
           <span
             className={`text-sm text-gray-900 cursor-pointer hover:underline whitespace-nowrap ${shouldBeSemiBold ? 'font-semibold' : ''}`}
             onClick={() => onViewDetails(record.id)}
           >
             {invoiceNumber}
           </span>
         );
       }
     },
     {
       key: 'portal',
       label: 'Portal',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <div className="flex items-center gap-2">
           <PortalLogo portalName={record.portal} className="w-4 h-4" />
         </div>
       )
     },
     {
       key: 'buyer',
       label: 'Buyer',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.buyer}</span>
       )
     },
     {
       key: 'supplierName',
       label: 'Supplier',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.supplierName}</span>
       )
     },
      {
        key: 'portalStatus',
        label: activeTab === 'conflict' ? 'Status' : 'Portal Status',
        className: 'w-[200px] min-w-[200px] whitespace-nowrap',
        render: (record: PortalRecord) => {
          // Show conflict status badge for conflict tab
          if (activeTab === 'conflict' && record.matchType === 'Conflict') {
            return <ConflictStatusBadge />;
          }
          return <StatusBadge status={record.portalStatus} />
        }
      },
     {
       key: 'total',
       label: 'Total',
       className: 'w-[200px] min-w-[200px] font-medium',
       render: (record: PortalRecord) => (
         <span className="text-sm font-medium text-gray-900">
           {formatCurrency(record.total, record.currency)}
         </span>
       )
     },
     {
       key: 'poNumber',
       label: 'PO Number',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.poNumber}</span>
       )
     },
     {
       key: 'invoiceDate',
       label: 'Invoice Date',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.invoiceDate || 'N/A'}</span>
       )
     },
     {
       key: 'dueDate',
       label: 'Due Date',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.dueDate || 'N/A'}</span>
       )
     },
     {
       key: 'netTerms',
       label: 'Net Terms',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.netTerms || 'N/A'}</span>
       )
     },
     {
       key: 'promiseToPay',
       label: 'Promise to Pay',
       className: 'w-[200px] min-w-[200px]',
        render: (record: PortalRecord) => {
          const toTime = (s?: string) => (s ? new Date(s).getTime() : NaN);
          const dueT = toTime(record.dueDate);
          const ptpT = toTime(record.promiseToPay);
          let value: string = 'N/A';
          if (!isNaN(dueT) && !isNaN(ptpT)) {
            value = ptpT >= dueT ? record.promiseToPay! : record.dueDate!;
          } else if (!isNaN(ptpT)) {
            value = record.promiseToPay!;
          } else if (!isNaN(dueT)) {
            value = record.dueDate!;
          }
          return (
            <span className="text-sm text-gray-900 truncate">{value}</span>
          );
        }
     }
     ];

    // Add conflict-specific columns for conflict tab
    if (activeTab === 'conflict') {
      baseColumns.push({
        key: 'conflictType',
        label: 'Conflict Type',
        className: 'w-[250px] min-w-[250px]',
        render: (record: PortalRecord) => (
          <span className="text-sm text-gray-900">
            Single portal record linked to multiple ERP invoices
          </span>
        )
      });
      baseColumns.push({
        key: 'linkedInvoices',
        label: 'Linked ERP Invoice(s)',
        className: 'w-[200px] min-w-[200px]',
        render: (record: PortalRecord) => (
          <span className="text-sm text-gray-900">
            {record.invoiceNumber ? `ERP-${record.invoiceNumber.slice(-3)}` : 'Multiple'}
          </span>
        )
      });
      baseColumns.push({
        key: 'lastSynced',
        label: 'Last Updated',
        className: 'w-[200px] min-w-[200px]',
        render: (record: PortalRecord) => <LastSyncedCell lastSynced={record.lastSynced} />
      });
    } else if (activeTab !== 'unmatched') {
      // Only add Match Type column if not on the "unmatched" or "conflict" tabs
      baseColumns.push({
        key: 'matchType',
        label: 'Match Type',
        className: 'w-[200px] min-w-[200px] whitespace-nowrap',
        render: (record: PortalRecord) => <MatchTypeBadge type={record.matchType} />
      });
    }

   return [
     ...baseColumns,
    {
      key: 'actions',
      label: 'Actions',
      className: 'text-right w-[200px] min-w-[200px]',
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
