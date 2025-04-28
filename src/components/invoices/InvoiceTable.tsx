
import { Invoice } from "@/types/invoice";
import { StatusBadge } from "@/components/ui/status-badge";
import { AlertCircle } from "lucide-react";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Invoice Number</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Buyer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Due Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Total</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Creation Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Owner</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-medium">{invoice.number}</span>
                    {invoice.hasWarning && (
                      <AlertCircle size={16} className="text-amber-500" />
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">{invoice.buyer}</td>
                <td className="py-3 px-4">{invoice.dueDate}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="py-3 px-4">{formatCurrency(invoice.total)}</td>
                <td className="py-3 px-4">{invoice.creationDate}</td>
                <td className="py-3 px-4">{invoice.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
