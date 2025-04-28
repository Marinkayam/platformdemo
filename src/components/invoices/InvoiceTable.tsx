
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { Invoice } from "@/types/invoice";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof Invoice | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (!sortField) return 0;
    
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA === fieldB) return 0;
    
    if (sortDirection === 'asc') {
      return fieldA < fieldB ? -1 : 1;
    } else {
      return fieldA > fieldB ? -1 : 1;
    }
  });

  const totalAmount = sortedInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const pendingCount = sortedInvoices.filter(invoice => invoice.status === "Pending Action").length;
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="h-14 bg-gray-50">
            <TableHead 
              className="w-[180px] cursor-pointer text-[14px] font-medium text-gray-600"
              onClick={() => handleSort('number')}
            >
              Invoice Number
              {sortField === 'number' && (
                <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer text-[14px] font-medium text-gray-600"
              onClick={() => handleSort('buyer')}
            >
              Buyer
              {sortField === 'buyer' && (
                <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer text-[14px] font-medium text-gray-600"
              onClick={() => handleSort('dueDate')}
            >
              Due Date
              {sortField === 'dueDate' && (
                <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
              )}
            </TableHead>
            <TableHead className="text-[14px] font-medium text-gray-600">Status</TableHead>
            <TableHead 
              className="text-right cursor-pointer text-[14px] font-medium text-gray-600"
              onClick={() => handleSort('total')}
            >
              Total
              {sortField === 'total' && (
                <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer text-[14px] font-medium text-gray-600"
              onClick={() => handleSort('owner')}
            >
              Owner
              {sortField === 'owner' && (
                <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {sortedInvoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-[14px] text-gray-600">
                No invoices found.
              </TableCell>
            </TableRow>
          ) : (
            sortedInvoices.map((invoice) => {
              const isPending = invoice.status === "Pending Action";
              return (
                <TableRow 
                  key={invoice.id}
                  className={`h-14 cursor-pointer hover:bg-gray-50 ${isPending ? 'bg-red-50/30' : ''}`}
                  onClick={() => navigate(`/invoices/${invoice.id}`)}
                >
                  <TableCell className="font-medium flex items-center gap-2 text-[14px]">
                    {invoice.hasWarning && (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                    <span className={isPending ? "text-red-600 font-medium" : ""}>
                      {invoice.number}
                    </span>
                  </TableCell>
                  <TableCell className="text-[14px] text-gray-900">{invoice.buyer}</TableCell>
                  <TableCell className="text-[14px] text-gray-900">{invoice.dueDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-right text-[14px] text-gray-900">
                    ${invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-[14px] text-gray-900">{invoice.owner}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="h-14 bg-gray-50">
            <TableCell className="text-[14px] font-medium text-gray-600">
              Showing {sortedInvoices.length} invoices
            </TableCell>
            <TableCell className="text-[14px] font-medium text-gray-600">
              {pendingCount} pending
            </TableCell>
            <TableCell colSpan={2}></TableCell>
            <TableCell className="text-right font-medium text-[14px] text-gray-900">
              ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
