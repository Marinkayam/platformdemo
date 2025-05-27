
import { PurchaseOrder } from "@/types/purchaseOrder";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PurchaseOrderShipToAddressProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderShipToAddress({ purchaseOrder }: PurchaseOrderShipToAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Ship To Address</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              {isOpen ? "Hide" : "Show"} Address
            </Button>
          </CollapsibleTrigger>
        </div>
        
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
