
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderFinancialFields } from "./financial/PurchaseOrderFinancialFields";
import { PurchaseOrderShipToAddress } from "./financial/PurchaseOrderShipToAddress";

interface PurchaseOrderFinancialDataProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderFinancialData({
  purchaseOrder
}: PurchaseOrderFinancialDataProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium">Purchase Order Information</h2>
      </div>

      <PurchaseOrderFinancialFields purchaseOrder={purchaseOrder} />

      <PurchaseOrderShipToAddress purchaseOrder={purchaseOrder} />
    </div>
  );
}
