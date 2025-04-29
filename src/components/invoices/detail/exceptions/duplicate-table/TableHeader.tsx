
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export function InvoiceTableHeader() {
  return (
    <TableHeader className="bg-gray-50">
      <TableRow>
        <TableHead className="w-12 text-center"></TableHead>
        <TableHead>Issue Date</TableHead>
        <TableHead>Total</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Exceptions</TableHead>
        <TableHead className="w-10"></TableHead>
      </TableRow>
    </TableHeader>
  );
}
