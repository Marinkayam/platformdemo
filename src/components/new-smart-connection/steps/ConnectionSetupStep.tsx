
import React from "react";
import { useNewSmartConnection } from "@/context/NewSmartConnectionContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const payableOptions = [
  "Acme Corporation",
  "Global Industries Ltd",
  "TechStart Solutions",
  "Metro Services Inc",
  "Pioneer Manufacturing",
  "Sunrise Enterprises",
  "NextGen Systems",
  "Atlantic Holdings"
];

const receivableOptions = [
  "Financial Services Corp",
  "Healthcare Solutions LLC",
  "Educational Partners Inc",
  "Retail Management Group",
  "Construction Alliance",
  "Transportation Networks",
  "Energy Solutions Ltd",
  "Media & Communications"
];

export function ConnectionSetupStep() {
  const { state, updateConnectionSetup } = useNewSmartConnection();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-[#8C92A3] text-lg">
          Set up the connection details for your new Smart Connection.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="payableName">Payable Name on the ERP *</Label>
          <Select 
            value={state.connectionSetup.payableName} 
            onValueChange={(value) => updateConnectionSetup({ payableName: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select payable name..." />
            </SelectTrigger>
            <SelectContent>
              {payableOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="receivable">Select Existing Receivable *</Label>
          <Select 
            value={state.connectionSetup.receivable} 
            onValueChange={(value) => updateConnectionSetup({ receivable: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choose a receivable from the list available in Monto" />
            </SelectTrigger>
            <SelectContent>
              {receivableOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
