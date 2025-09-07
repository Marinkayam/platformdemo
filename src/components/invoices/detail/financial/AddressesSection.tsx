
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function AddressesSection() {
  const [addressesOpen, setAddressesOpen] = useState(false);
  
  return (
    <div className="border-t pt-4">
      <button 
        onClick={() => setAddressesOpen(!addressesOpen)}
        className="w-full flex items-center justify-between py-2 text-left font-medium"
      >
        <span>Addresses & Banking Information</span>
        {addressesOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-8 pt-4", 
        addressesOpen ? "block" : "hidden")}>
        <div className="space-y-4">
          <Label className="text-sm font-medium">Bill To / Ship To</Label>
          <div className="space-y-2">
            <Input 
              value="Bristol Myers Squibb Co" 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
            <Input 
              value="Route 206 & Province Line Road" 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
            <Input 
              value="Lawrence Township, NJ 08540, USA" 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label className="text-sm font-medium">Remit To</Label>
          <div className="space-y-2">
            <Input 
              value="Lockbox 15979" 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
            <Input 
              value="Collection Center Dr." 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
            <Input 
              value="Chicago, IL 60693, USA" 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label className="text-sm font-medium">Bank Information</Label>
          <div className="space-y-2">
            <Input 
              value="Bank of America" 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
            <Input 
              value="New York, NY" 
              readOnly 
              className="bg-gray-50 text-sm" 
            />
            <Input 
              value="" 
              readOnly 
              className="bg-gray-50 text-sm opacity-0" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
