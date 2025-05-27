
import { PurchaseOrder } from "@/types/purchaseOrder";

interface PurchaseOrderShipToAddressProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderShipToAddress({ purchaseOrder }: PurchaseOrderShipToAddressProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Ship To Address</h3>
      
      <div className="text-sm text-gray-900 space-y-1">
        <p>{purchaseOrder.shipToAddress.line1}</p>
        {purchaseOrder.shipToAddress.line2 && <p>{purchaseOrder.shipToAddress.line2}</p>}
        <p>
          {purchaseOrder.shipToAddress.city}, {purchaseOrder.shipToAddress.state} {purchaseOrder.shipToAddress.zipCode}
        </p>
        <p>{purchaseOrder.shipToAddress.country}</p>
      </div>
    </div>
  );
}
