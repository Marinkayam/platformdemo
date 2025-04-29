
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { POInformationProps } from "./types";

interface POCardProps {
  po: POInformationProps;
}

export const POInformationCard = ({ po }: POCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Purchase Order Information</CardTitle>
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
            <label className="text-sm text-gray-500">PO Date</label>
            <Input 
              value={po.orderDate} 
              readOnly 
              className="bg-gray-50"
            />
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
            <label className="text-sm text-gray-500">Total Amount</label>
            <Input 
              value={`$${po.totalAmount.toLocaleString()}`} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
