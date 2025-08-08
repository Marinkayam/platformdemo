
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
        <SortIcon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
      </button>
    );
  };

  return (
    <TableHeader>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
        <TableHead className="sticky left-0 z-30 bg-[#F6F7F9] border-r border-gray-200 w-[250px] min-w-[250px] text-left text-sm font-semibold">
          {renderSortButton('number', 'Invoice Number')}
        </TableHead>
        
        <TableHead className="w-[250px] min-w-[250px] text-left text-sm font-semibold">
          {renderSortButton('buyer', 'Buyer')}
        </TableHead>

        <TableHead className="w-[200px] min-w-[200px] text-left text-sm font-semibold">
          {renderSortButton('dueDate', 'Due Date')}
        </TableHead>

        <TableHead className="w-[200px] min-w-[200px] text-left text-sm font-semibold">
          Status
        </TableHead>
        
        <TableHead className="w-[250px] min-w-[250px] text-left text-sm font-semibold">
          Portal
        </TableHead>
        
        <TableHead className="w-[200px] min-w-[200px] text-left text-sm font-semibold">
          {renderSortButton('total', 'Total')}
        </TableHead>

        <TableHead className="w-[250px] min-w-[250px] text-left text-sm font-semibold">
          {renderSortButton('poNumber', 'PO Number')}
        </TableHead>

        <TableHead className="w-[200px] min-w-[200px] text-left text-sm font-semibold">
          {renderSortButton('invoiceDate', 'Invoice Date')}
        </TableHead>

        <TableHead className="w-[200px] min-w-[200px] text-left text-sm font-semibold">
          {renderSortButton('netTerms', 'Net Terms')}
        </TableHead>

        <TableHead className="w-[200px] min-w-[200px] text-left text-sm font-semibold">
          Notes
        </TableHead>

        <TableHead className="w-[200px] min-w-[200px] text-left text-sm font-semibold">
          Source
        </TableHead>

        {isPendingTab ? (
          <TableHead className="w-[250px] min-w-[250px] text-left text-sm font-semibold">
            Assignee
          </TableHead>
        ) : (
          <TableHead className="w-[250px] min-w-[250px] text-left text-sm font-semibold">
            {renderSortButton('owner', 'Owner')}
          </TableHead>
        )}

        <TableHead className="w-[150px] min-w-[150px] text-center text-sm font-semibold">
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
