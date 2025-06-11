import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PurchaseOrderFinancialDataProps {
  purchaseOrder: PurchaseOrder;
  className?: string;
}

export function PurchaseOrderFinancialData({ purchaseOrder, className }: PurchaseOrderFinancialDataProps) {
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Financial Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">VAT/Tax ID</label>
            <Input value={purchaseOrder.vatTaxId || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Invoice #</label>
            <Input value={purchaseOrder.invoiceNumber || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Invoice Date</label>
            <Input
              value={purchaseOrder.invoiceDate ? format(new Date(purchaseOrder.invoiceDate), "MMMM dd, yyyy") : "N/A"}
              readOnly
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Amount Due</label>
            <Input
              value={formatCurrency(purchaseOrder.total || 0, purchaseOrder.currency || "USD")}
              readOnly
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Terms</label>
            <Input value={purchaseOrder.paymentTerms || "N/A"} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Due Date</label>
            <Input
              value={purchaseOrder.dueDate ? format(new Date(purchaseOrder.dueDate), "MMMM dd, yyyy") : "N/A"}
              readOnly
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">PO #</label>
            <Input value={purchaseOrder.poNumber || "N/A"} readOnly className="bg-gray-50" />
          </div>
        </div>

        {/* Addresses & Banking Information */}
        {purchaseOrder.shipToAddress && (
          <div className="border-t pt-6 mt-6">
            <Collapsible open={isAddressOpen} onOpenChange={setIsAddressOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between items-center text-lg font-semibold px-0 hover:bg-transparent">
                  <CardTitle className="text-lg font-semibold">Addresses & Banking Information</CardTitle>
                  {isAddressOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="text-sm text-gray-900">
                  <p>{purchaseOrder.shipToAddress.line1 || "N/A"}</p>
                  {purchaseOrder.shipToAddress.line2 && <p>{purchaseOrder.shipToAddress.line2}</p>}
                  <p>
                    {purchaseOrder.shipToAddress.city || "N/A"}, {purchaseOrder.shipToAddress.state || "N/A"} {purchaseOrder.shipToAddress.zipCode || "N/A"}
                  </p>
                  <p>{purchaseOrder.shipToAddress.country || "N/A"}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 