
import { Button } from "@/components/ui/button";
import { PurchaseOrderStatusBadge } from "@/components/ui/purchase-order-status-badge";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PurchaseOrderDetailHeaderProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderDetailHeader({ purchaseOrder }: PurchaseOrderDetailHeaderProps) {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/purchase-orders')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#38415F]">{purchaseOrder.poNumber}</h1>
          <p className="text-sm text-gray-600">Purchase Order Details</p>
        </div>
      </div>

      <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          <PurchaseOrderStatusBadge status={purchaseOrder.status} />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Buyer:</span>
          <span className="text-sm text-gray-900">{purchaseOrder.buyerName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Portal:</span>
          <span className="text-sm text-gray-900">{purchaseOrder.portal}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Total:</span>
          <span className="text-sm font-semibold text-gray-900">{formatCurrency(purchaseOrder.total)}</span>
        </div>
      </div>
    </div>
  );
}
