
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

  return (
    <TableHeader>
      <TableRow className="h-14 bg-gray-50">
        <TableHead onClick={() => onSort('number')} className="w-[180px] cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Invoice Number
          {renderSortIndicator('number')}
        </TableHead>
        
        <TableHead onClick={() => onSort('owner')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Owner
          {renderSortIndicator('owner')}
        </TableHead>
        
        <TableHead onClick={() => onSort('buyer')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
          Buyer
          {renderSortIndicator('buyer')}
        </TableHead>

        {isPendingTab ? (
          <TableHead className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
            Rejected by
          </TableHead>
        ) : (
          <TableHead onClick={() => onSort('dueDate')} className="cursor-pointer text-[14px] font-medium text-gray-600 bg-white px-4">
            Due Date
            {renderSortIndicator('dueDate')}
          </TableHead>
        )}

        <TableHead className="text-[14px] font-medium text-gray-600 bg-white px-4">
          Status
        </TableHead>
        
        <TableHead className="text-[14px] font-medium text-gray-600 bg-white px-4">
          Portal
        </TableHead>
        
        <TableHead onClick={() => onSort('total')} className="cursor-pointer text-[14px] font-medium text-gray-600 text-right bg-white px-4">
          Total
          {renderSortIndicator('total')}
        </TableHead>
        
        {isPendingTab && (
          <TableHead className="text-[14px] font-medium text-gray-600 bg-white px-4">
            Assignee
          </TableHead>
        )}

        <TableHead className="w-[60px] text-[14px] font-medium text-gray-600 bg-white px-4 text-center">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
