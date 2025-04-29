
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { POInformationProps, PortalType } from "./types";

const getPortalIcon = (type: PortalType) => {
  return type.substring(0, 1);
};

export const POInformationCard = ({ po }: { po: POInformationProps }) => {
  const { toast } = useToast();

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Purchase Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <h3 className="text-base font-medium">
            PO #
          </h3>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 ml-2" 
                onClick={() => {
                  navigator.clipboard.writeText(po.number);
                  toast({
                    title: "Copied to clipboard",
                    description: `PO number ${po.number} has been copied`,
                  });
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy PO number</TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Customer</label>
            <Input value={po.customerName} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Portal/SC</label>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {getPortalIcon(po.portalInfo.type)}
              </span>
              <Input value={po.portalInfo.type} readOnly disabled className="bg-gray-50" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Order Date</label>
            <Input value={new Date(po.orderDate).toLocaleDateString()} readOnly disabled className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Total Amount</label>
            <Input value={`$${po.totalAmount.toLocaleString()}`} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Total Invoiced</label>
            <Input value={`$${po.totalInvoiced.toLocaleString()}`} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Amount Left</label>
            <Input value={`$${po.amountLeft.toLocaleString()}`} readOnly disabled className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Payment Terms</label>
            <Input value={po.paymentTerms} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Currency</label>
            <Input value={po.currency} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Buyer Reference</label>
            <Input value={po.buyerReference} readOnly disabled className="bg-gray-50" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="text-primary flex items-center gap-2">
          View Full Details <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
