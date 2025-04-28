
import { Invoice } from "@/types/invoice";

export function FinancialData({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Financial Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-sm text-gray-500">Total Amount</label>
          <p className="text-xl font-semibold">${invoice.total.toLocaleString()}</p>
        </div>
        
        <div>
          <label className="text-sm text-gray-500">Due Date</label>
          <p>{invoice.dueDate}</p>
        </div>
        
        <div>
          <label className="text-sm text-gray-500">Creation Date</label>
          <p>{invoice.creationDate}</p>
        </div>

        {invoice.paymentTerms && (
          <div>
            <label className="text-sm text-gray-500">Payment Terms</label>
            <p>{invoice.paymentTerms}</p>
          </div>
        )}

        {invoice.currency && (
          <div>
            <label className="text-sm text-gray-500">Currency</label>
            <p>{invoice.currency}</p>
          </div>
        )}

        {invoice.poNumber && (
          <div>
            <label className="text-sm text-gray-500">PO Number</label>
            <p>{invoice.poNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}
