
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchaseOrder";

interface PurchaseOrderTableHeaderProps {
  sortField: keyof PurchaseOrder | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof PurchaseOrder) => void;
}

export function PurchaseOrderTableHeader({
  sortField,
  sortDirection,
  onSort
}: PurchaseOrderTableHeaderProps) {
  const renderSortIndicator = (field: keyof PurchaseOrder) => {
    return sortField === field && <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <TableHeader>
      <TableRow className="h-14 bg-gray-50">
        <TableHead onClick={() => onSort('poNumber')} className="w-[180px] cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          PO Number
          {renderSortIndicator('poNumber')}
        </TableHead>
        
        <TableHead onClick={() => onSort('buyerName')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Buyer Name
          {renderSortIndicator('buyerName')}
        </TableHead>

        <TableHead className="text-[14px] font-medium text-gray-600 bg-white px-4">
          Status
        </TableHead>
        
        <TableHead onClick={() => onSort('portal')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Portal
          {renderSortIndicator('portal')}
        </TableHead>
        
        <TableHead onClick={() => onSort('total')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Total
          {renderSortIndicator('total')}
        </TableHead>

        <TableHead onClick={() => onSort('invoicedAmount')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Invoiced Amount
          {renderSortIndicator('invoicedAmount')}
        </TableHead>

        <TableHead onClick={() => onSort('amountLeft')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Amount Left
          {renderSortIndicator('amountLeft')}
        </TableHead>

        <TableHead className="text-[14px] font-medium text-gray-600 bg-white px-4">
          Payment Terms
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
