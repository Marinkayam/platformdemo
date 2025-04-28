import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Invoice, LineItem } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

interface PdfViewerProps {
  invoice: Invoice;
  lineItems: LineItem[];
  isOpen: boolean;
  onClose: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function PdfViewer({ 
  invoice, 
  lineItems, 
  isOpen, 
  onClose, 
  zoomLevel, 
  onZoomIn, 
  onZoomOut 
}: PdfViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Invoice Preview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={onZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="outline" size="icon" onClick={onZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="bg-white border rounded-md flex-1 overflow-auto p-8">
          <div 
            className="bg-white mx-auto max-w-2xl transition-all duration-200 ease-in-out"
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
              
              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b border-gray-300 text-left">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-right">Quantity</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-3">{item.description}</td>
                      <td className="py-3 text-right">{item.quantity}</td>
                      <td className="py-3 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="py-3 text-right">${item.total.toFixed(2)}</td>
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
                  <div className="flex justify-between py-1 font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(invoice.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
