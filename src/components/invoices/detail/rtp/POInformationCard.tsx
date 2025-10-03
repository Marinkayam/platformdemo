import React, { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { POInformationProps } from "./types";
import { StatusBadge } from "@/components/ui/status-badge";
import { useNavigate } from "react-router-dom";

interface POCardProps {
  po: POInformationProps;
}

export const POInformationCard = ({ po }: POCardProps) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewFullDetails = () => {
    navigate(`/purchase-orders/${po.id || po.number}`);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Purchase Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">PO #</label>
            <div className="flex items-center">
              <Input 
                value={po.number} 
                readOnly 
                className="bg-gray-50 pr-10"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0 ml-[-34px] relative z-10"
                      onClick={() => handleCopy(po.number)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Status</label>
            <div>
              <StatusBadge status={po.status} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Buyer</label>
            <Input 
              value={po.customerName} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Portal / SC</label>
            <Input 
              value={`${po.portalInfo.type} - ${po.portalInfo.reference}`} 
              readOnly 
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">PO Date</label>
            <Input 
              value={po.orderDate} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Total Amount</label>
            <Input 
              value={`${po.currency} ${po.totalAmount.toLocaleString()}`} 
              readOnly 
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Total Invoiced</label>
            <Input 
              value={`${po.currency} ${po.totalInvoiced.toLocaleString()}`} 
              readOnly 
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Amount Left</label>
            <Input 
              value={`${po.currency} ${po.amountLeft.toLocaleString()}`} 
              readOnly 
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Payment Terms</label>
            <Input 
              value={po.paymentTerms} 
              readOnly 
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Currency</label>
            <Input 
              value={po.currency} 
              readOnly 
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Buyer Reference</label>
            <Input
              value={po.buyerReference}
              readOnly
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* View Full Details link */}
        <div className="pt-4">
          <button
            onClick={handleViewFullDetails}
            className="text-primary-main hover:text-primary-700 text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View Full Details
            <ExternalLink size={14} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
