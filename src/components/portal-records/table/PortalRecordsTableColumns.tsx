import { TriangleAlert } from "lucide-react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalLogo } from "../PortalLogo";
import { MatchTypeBadge } from "../MatchTypeBadge";
import { ConnectionStatusBadge } from "../ConnectionStatusBadge";
import { LastSyncedCell } from "../LastSyncedCell";
import { ActionsColumn } from "./columns/ActionsColumn";
import { PortalStatusColumn } from "./columns/PortalStatusColumn";
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
       label: 'Portal Buyer Name',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.buyer}</span>
       )
     },
     {
       key: 'portalStatus',
       label: 'Status',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <PortalStatusColumn record={record} />
       )
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
       key: 'currency',
       label: 'Currency',
       className: 'w-[120px] min-w-[120px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900">{record.currency}</span>
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
       key: 'paymentTerms',
       label: 'PO Payment Terms',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.paymentTerms || 'N/A'}</span>
       )
     },
     {
       key: 'netTerms',
       label: 'Net Terms',
       className: 'w-[200px] min-w-[200px]',
       render: (record: PortalRecord) => (
         <span className="text-sm text-gray-900 truncate">{record.netTerms || 'N/A'}</span>
       )
     }
     ];

    // Don't add Match Type column for "unmatched" or "conflict" tabs (they should look the same)
    if (activeTab !== 'unmatched' && activeTab !== 'conflict') {
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
