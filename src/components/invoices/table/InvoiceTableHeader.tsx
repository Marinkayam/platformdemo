
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

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
  const renderSortButton = (field: keyof Invoice, label: string) => {
    const isActive = sortField === field;
    const SortIcon = !isActive ? ArrowUpDown : sortDirection === 'asc' ? ArrowUp : ArrowDown;
    
    return (
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-2 hover:text-gray-900 transition-colors text-left"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon className="h-4 w-4" />
      </button>
    );
  };

  return (
    <TableHeader>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
        <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 min-w-[200px] xl:min-w-[220px] text-left">
          {renderSortButton('number', 'Invoice Number')}
        </TableHead>
        
        <TableHead className="min-w-[160px] xl:min-w-[180px]">
          {renderSortButton('buyer', 'Buyer')}
        </TableHead>

        {isPendingTab ? (
          <TableHead className="min-w-[130px] xl:min-w-[140px]">
            Rejected By
          </TableHead>
        ) : (
          <TableHead className="min-w-[130px] xl:min-w-[140px]">
            {renderSortButton('dueDate', 'Due Date')}
          </TableHead>
        )}

        <TableHead className="min-w-[110px] xl:min-w-[120px]">
          Status
        </TableHead>
        
        <TableHead className="min-w-[160px] xl:min-w-[180px]">
          Portal
        </TableHead>
        
        <TableHead className="min-w-[140px] xl:min-w-[150px] text-right">
          {renderSortButton('total', 'Total')}
        </TableHead>

        {isPendingTab ? (
          <TableHead className="min-w-[140px] xl:min-w-[160px]">
            Assignee
          </TableHead>
        ) : (
          <TableHead className="min-w-[140px] xl:min-w-[160px]">
            {renderSortButton('owner', 'Owner')}
          </TableHead>
        )}

        <TableHead className="w-[80px] text-center">
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
