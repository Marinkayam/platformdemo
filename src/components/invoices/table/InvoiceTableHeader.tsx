import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
interface InvoiceTableHeaderProps {
  sortField: keyof Invoice | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Invoice) => void;
  isPendingTab: boolean;
}
export function InvoiceTableHeader({
  sortField,
  sortDirection,
  onSort,
  isPendingTab
}: InvoiceTableHeaderProps) {
  const renderSortIndicator = (field: keyof Invoice) => {
    return sortField === field && <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>;
  };
  return <TableHeader>
      <TableRow className="h-14 bg-gray-50">
        <TableHead onClick={() => onSort('number')} className="w-[180px] cursor-pointer text-[14px] font-medium text-gray-600 bg-white">
          Invoice Number
          {renderSortIndicator('number')}
        </TableHead>
        
        <TableHead onClick={() => onSort('buyer')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white">
          Buyer
          {renderSortIndicator('buyer')}
        </TableHead>

        {isPendingTab ? <TableHead className="cursor-pointer text-[14px] font-medium text-gray-600">
            Rejected by
          </TableHead> : <TableHead onClick={() => onSort('dueDate')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white">
            Due Date
            {renderSortIndicator('dueDate')}
          </TableHead>}

        <TableHead className="text-[14px] font-medium text-gray-600 bg-white">
          Status
        </TableHead>
        
        <TableHead onClick={() => onSort('total')} className="cursor-pointer text-[14px] font-medium text-gray-600 text-left bg-white">
          Total
          {renderSortIndicator('total')}
        </TableHead>
        
        <TableHead className="text-[14px] font-medium text-gray-600 bg-white">
          Portal
        </TableHead>
        
        <TableHead className="text-[14px] font-medium text-gray-600 bg-white">
          Owner
        </TableHead>
      </TableRow>
    </TableHeader>;
}