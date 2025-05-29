
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type SortField = "poNumber" | "buyerName" | "status" | "portal" | "total" | "invoicedAmount" | "amountLeft" | "paymentTerms";
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
        <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 flex-1">
          <SortButton field="poNumber">PO Number</SortButton>
        </TableHead>
        <TableHead className="flex-1">
          <SortButton field="buyerName">Buyer Name</SortButton>
        </TableHead>
        <TableHead className="flex-1">
          <SortButton field="status">Status</SortButton>
        </TableHead>
        <TableHead className="flex-1">
          <SortButton field="portal">Portal</SortButton>
        </TableHead>
        <TableHead className="flex-1">
          <SortButton field="total">Total</SortButton>
        </TableHead>
        <TableHead className="flex-1">
          <SortButton field="invoicedAmount">Invoiced Amount</SortButton>
        </TableHead>
        <TableHead className="flex-1">
          <SortButton field="amountLeft">Amount Left</SortButton>
        </TableHead>
        <TableHead className="flex-1">
          <SortButton field="paymentTerms">Payment Terms</SortButton>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
