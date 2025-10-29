import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";
import { format } from "date-fns";

interface POContentProps {
  purchaseOrder: PurchaseOrder;
  zoomLevel: number;
}

export function POContent({ purchaseOrder, zoomLevel }: POContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Use a ResizeObserver to track container width changes
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Calculate TRA
  const pendingSubmissionAmount = 0;
  const tra = (purchaseOrder.total || 0) - (purchaseOrder.invoicedAmount || 0) - pendingSubmissionAmount;

  return (
    <div
      ref={containerRef}
      className="bg-white border rounded-md flex-1 overflow-auto p-6"
    >
      <div
        className="bg-white mx-auto transition-all duration-200 ease-in-out shadow-md"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top center',
          width: Math.min(containerWidth * 0.9, 794), // A4 width in pixels at 96 DPI
          maxWidth: '100%'
        }}
      >
        <div className="border border-gray-200 rounded-lg p-8">
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">PURCHASE ORDER</h1>
              <p className="text-gray-500">{purchaseOrder.poNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{purchaseOrder.buyerName}</p>
              <p className="text-sm text-gray-500">Buyer Organization</p>
              <p className="text-sm text-gray-500">Via {purchaseOrder.portal}</p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Supplier:</h3>
              <p>{typeof purchaseOrder.supplier === 'object' ? purchaseOrder.supplier?.name : purchaseOrder.supplier || "Tech Solutions Inc"}</p>
              <p className="text-sm text-gray-500">Supplier Address</p>
              <p className="text-sm text-gray-500">City, State 12345</p>
            </div>

            <div className="text-right">
              <div className="mb-2">
                <span className="font-semibold">PO Date:</span>
                <span className="ml-2">
                  {purchaseOrder.orderDate ? format(new Date(purchaseOrder.orderDate), "MMM dd, yyyy") : "N/A"}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Payment Terms:</span>
                <span className="ml-2">{purchaseOrder.paymentTerms || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Status:</span>
                <span className="ml-2">{purchaseOrder.status}</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          {purchaseOrder.lineItems && purchaseOrder.lineItems.length > 0 ? (
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
                {purchaseOrder.lineItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-2">{item.description}</td>
                    <td className="py-3 px-2 text-right">{item.quantity}</td>
                    <td className="py-3 px-2 text-right">
                      {formatCurrency(item.unitPrice, purchaseOrder.currency || "USD")}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {formatCurrency(item.total, purchaseOrder.currency || "USD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="mb-6 p-4 bg-gray-50 rounded border text-center text-gray-500">
              <p>No line items available for this purchase order</p>
            </div>
          )}

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Total Amount</span>
                <span>{formatCurrency(purchaseOrder.total || 0, purchaseOrder.currency || "USD")}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Invoiced Amount</span>
                <span>{formatCurrency(purchaseOrder.invoicedAmount || 0, purchaseOrder.currency || "USD")}</span>
              </div>
              <div className="flex justify-between py-2 font-bold border-t border-gray-200">
                <span>Total Remaining (TRA)</span>
                <span className="text-green-600">{formatCurrency(tra, purchaseOrder.currency || "USD")}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Purchase Order • Generated via {purchaseOrder.portal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}