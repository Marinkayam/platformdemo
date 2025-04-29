
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
      
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 pt-4", 
        addressesOpen ? "block" : "hidden")}>
        <div className="space-y-4">
          <h4 className="font-medium">Bill To / Ship To:</h4>
          <p className="text-sm text-gray-600">
            Bristol Myers Squibb Co<br />
            Route 206 & Province Line Road<br />
            Lawrence Township, NJ 08540, USA
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Remit To:</h4>
          <p className="text-sm text-gray-600">
            Lockbox 15979<br />
            Collection Center Dr.<br />
            Chicago, IL 60693, USA
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Bank Information:</h4>
          <p className="text-sm text-gray-600">
            Bank of America<br />
            New York, NY
          </p>
        </div>
      </div>
    </div>
  );
}
