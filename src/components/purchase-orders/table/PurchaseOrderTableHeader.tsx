import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type SortField = "poNumber" | "supplier" | "status" | "portal" | "totalAmount" | "invoicedAmount" | "amountLeft" | "dueDate";
type SortDirection = "asc" | "desc";

interface PurchaseOrderTableHeaderProps {
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function PurchaseOrderTableHeader({ 
  sortField, 
  sortDirection, 
  onSort
}: PurchaseOrderTableHeaderProps) {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === "asc" ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => onSort(field)}
      className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 justify-start flex items-center gap-2"
      aria-label={`Sort by ${children}`}
    >
      {children}
      {getSortIcon(field)}
    </Button>
  );

  return (
    <TableHeader>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
        <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 w-[200px] min-w-[200px]">
           <SortButton field="poNumber">PO Number</SortButton>
         </TableHead>
         <TableHead className="w-[200px] min-w-[200px]">
           <SortButton field="supplier">Buyer Name</SortButton>
         </TableHead>
         <TableHead className="w-[200px] min-w-[200px]">
           <SortButton field="status">Portal Status</SortButton>
         </TableHead>
         <TableHead className="w-[200px] min-w-[200px]">
           <SortButton field="portal">Portal</SortButton>
         </TableHead>
         <TableHead className="w-[200px] min-w-[200px]">
           <SortButton field="totalAmount">Total Amount</SortButton>
         </TableHead>
         <TableHead className="w-[200px] min-w-[200px]">
           <SortButton field="invoicedAmount">Amount Invoiced</SortButton>
         </TableHead>
         <TableHead className="w-[200px] min-w-[200px]">
           <SortButton field="amountLeft">Amount Left</SortButton>
         </TableHead>
         <TableHead className="w-[200px] min-w-[200px]">
           <SortButton field="dueDate">Payment Terms</SortButton>
         </TableHead>
      </TableRow>
    </TableHeader>
  );
}
