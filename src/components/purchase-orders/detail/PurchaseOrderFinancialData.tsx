
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
        <h2 className="text-lg font-semibold">Purchase Order Information</h2>
      </div>

      <div className="bg-white rounded-lg p-6 border-0 shadow-none">
        <PurchaseOrderFinancialFields purchaseOrder={purchaseOrder} />
      </div>

      <PurchaseOrderShipToAddress purchaseOrder={purchaseOrder} />
    </div>
  );
}
