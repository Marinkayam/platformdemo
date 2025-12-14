
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
        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm sticky left-0 z-30 bg-[rgb(246,247,249)] border-r border-gray-200 w-[300px] min-w-[300px] max-w-[300px]">
          {renderSortButton('number', 'Invoice Number')}
        </TableHead>
        
        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[250px] min-w-[250px]">
          {renderSortButton('buyer', 'Buyer')}
        </TableHead>

        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[200px] min-w-[200px]">
          {renderSortButton('invoiceDate', 'Invoice Date')}
        </TableHead>

        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[200px] min-w-[200px]">
          Monto Status
        </TableHead>
        
        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[250px] min-w-[250px]">
          Portal
        </TableHead>
        
        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[200px] min-w-[200px]">
          {renderSortButton('total', 'Total')}
        </TableHead>

        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[250px] min-w-[250px]">
          {renderSortButton('poNumber', 'PO Number')}
        </TableHead>

        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[200px] min-w-[200px]">
          {renderSortButton('dueDate', 'Due Date')}
        </TableHead>

        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[200px] min-w-[200px]">
          {renderSortButton('netTerms', 'Net Terms')}
        </TableHead>

        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[200px] min-w-[200px]">
          Notes
        </TableHead>

        <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[200px] min-w-[200px]">
          Source
        </TableHead>

        {isPendingTab ? (
          <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[250px] min-w-[250px]">
            Assignee
          </TableHead>
        ) : (
          <TableHead className="h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[250px] min-w-[250px]">
            {renderSortButton('owner', 'Owner')}
          </TableHead>
        )}

        <TableHead className="h-[50px] px-4 text-center align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] w-[150px] min-w-[150px]">
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
