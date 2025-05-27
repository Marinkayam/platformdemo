
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PurchaseOrderShipToAddressProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderShipToAddress({ purchaseOrder }: PurchaseOrderShipToAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 border-0 shadow-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="text-lg font-semibold mb-0">Ship To Address</h3>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-4">
          <div className="text-sm text-gray-900 space-y-1">
            <p>{purchaseOrder.shipToAddress.line1}</p>
            {purchaseOrder.shipToAddress.line2 && <p>{purchaseOrder.shipToAddress.line2}</p>}
            <p>
              {purchaseOrder.shipToAddress.city}, {purchaseOrder.shipToAddress.state} {purchaseOrder.shipToAddress.zipCode}
            </p>
            <p>{purchaseOrder.shipToAddress.country}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
