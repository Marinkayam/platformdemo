
import { Invoice, LineItem } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

interface PdfContentProps {
  invoice: Invoice;
  lineItems: LineItem[];
  zoomLevel: number;
}

export function PdfContent({ invoice, lineItems, zoomLevel }: PdfContentProps) {
  return (
    <div className="bg-white border rounded-md flex-1 overflow-auto p-6">
      <div 
        className="bg-white mx-auto w-[21cm] transition-all duration-200 ease-in-out shadow-md"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
      >
        <div className="border border-gray-200 rounded-lg p-8">
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-gray-500">{invoice.number}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Company Name Inc.</p>
              <p className="text-sm text-gray-500">123 Business St.</p>
              <p className="text-sm text-gray-500">City, State 12345</p>
            </div>
          </div>
          
          <div className="mb-6 grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Bill To:</h3>
              <p>{invoice.buyer}</p>
              <p className="text-sm text-gray-500">Client Address</p>
              <p className="text-sm text-gray-500">City, State 54321</p>
            </div>
            
            <div className="text-right">
              <div className="mb-2">
                <span className="font-semibold">Invoice Date:</span>
                <span className="ml-2">{invoice.creationDate}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Due Date:</span>
                <span className="ml-2">{invoice.dueDate}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Status:</span>
                <span className="ml-2">{invoice.status}</span>
              </div>
            </div>
          </div>
          
          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="py-2 px-2">Description</th>
                <th className="py-2 px-2 text-right">Quantity</th>
                <th className="py-2 px-2 text-right">Unit Price</th>
                <th className="py-2 px-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 px-2">{item.description}</td>
                  <td className="py-3 px-2 text-right">{item.quantity}</td>
                  <td className="py-3 px-2 text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{formatCurrency(invoice.subtotal || invoice.total * 0.9)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>Tax</span>
                <span>{formatCurrency(invoice.tax || invoice.total * 0.1)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
