
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SortField = "poNumber" | "buyerName" | "status" | "portal" | "total" | "invoicedAmount" | "amountLeft" | "paymentTerms";
type SortDirection = "asc" | "desc";

interface PurchaseOrderTableHeaderProps {
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}

export function PurchaseOrderTableHeader({ 
  sortField, 
  sortDirection, 
  onSort,
  className 
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
      className="h-auto p-0 font-medium text-gray-600 hover:text-gray-900 justify-start"
    >
      {children}
      {getSortIcon(field)}
    </Button>
  );

  return (
    <TableHeader className={cn("border-b", className)}>
      <TableRow className="bg-gray-50 hover:bg-gray-50">
        <TableHead className="py-3 px-4 text-left sticky left-0 z-10 bg-gray-50">
          <SortButton field="poNumber">PO Number</SortButton>
        </TableHead>
        <TableHead className="py-3 px-4">
          <SortButton field="buyerName">Buyer Name</SortButton>
        </TableHead>
        <TableHead className="py-3 px-4">
          <SortButton field="status">Status</SortButton>
        </TableHead>
        <TableHead className="py-3 px-4">
          <SortButton field="portal">Portal</SortButton>
        </TableHead>
        <TableHead className="py-3 px-4">
          <SortButton field="total">Total</SortButton>
        </TableHead>
        <TableHead className="py-3 px-4">
          <SortButton field="invoicedAmount">Invoiced Amount</SortButton>
        </TableHead>
        <TableHead className="py-3 px-4">
          <SortButton field="amountLeft">Amount Left</SortButton>
        </TableHead>
        <TableHead className="py-3 px-4">
          <SortButton field="paymentTerms">Payment Terms</SortButton>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
