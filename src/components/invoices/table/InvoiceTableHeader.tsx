
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
    return sortField === field && (
      <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
    );
  };

  return (
    <TableHeader>
      <TableRow className="h-14 bg-gray-50">
        <TableHead 
          className="w-[180px] cursor-pointer text-[14px] font-medium text-gray-600"
          onClick={() => onSort('number')}
        >
          Invoice Number
          {renderSortIndicator('number')}
        </TableHead>
        
        <TableHead 
          className="cursor-pointer text-[14px] font-medium text-gray-600"
          onClick={() => onSort('buyer')}
        >
          Buyer
          {renderSortIndicator('buyer')}
        </TableHead>

        {isPendingTab ? (
          <TableHead className="cursor-pointer text-[14px] font-medium text-gray-600">
            Rejected by
          </TableHead>
        ) : (
          <TableHead 
            className="cursor-pointer text-[14px] font-medium text-gray-600"
            onClick={() => onSort('dueDate')}
          >
            Due Date
            {renderSortIndicator('dueDate')}
          </TableHead>
        )}

        {isPendingTab ? (
          <TableHead 
            className="cursor-pointer text-[14px] font-medium text-gray-600"
            onClick={() => onSort('creationDate')}
          >
            Creation Date
            {renderSortIndicator('creationDate')}
          </TableHead>
        ) : (
          <TableHead className="text-[14px] font-medium text-gray-600">
            Status
          </TableHead>
        )}
        
        <TableHead 
          className="cursor-pointer text-[14px] font-medium text-gray-600 text-left"
          onClick={() => onSort('total')}
        >
          Total
          {renderSortIndicator('total')}
        </TableHead>
        
        <TableHead className="text-[14px] font-medium text-gray-600">
          {isPendingTab ? "Assignee" : "Owner"}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
