
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

      <div className={cn("pt-8 space-y-8",
        addressesOpen ? "block" : "hidden")}>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">Bill to:</Label>
          <div className="space-y-3">
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
      </div>
    </div>
  );
}
