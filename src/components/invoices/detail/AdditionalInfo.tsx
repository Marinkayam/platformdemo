
import { Input } from "@/components/ui/input";
import { Invoice } from "@/types/invoice";

interface AdditionalInfoProps {
  invoice: Invoice;
}

export function AdditionalInfo({ invoice }: AdditionalInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Additional Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="poNumber" className="text-sm text-muted-foreground">
            PO Number
          </label>
          <Input 
            id="poNumber"
            value={invoice.poNumber || "PO-123456"} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="taxId" className="text-sm text-muted-foreground">
            Tax ID
          </label>
          <Input 
            id="taxId"
            value={invoice.taxId || "TAX-987654321"} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="buyer" className="text-sm text-muted-foreground">
            Buyer
          </label>
          <Input 
            id="buyer"
            value={invoice.buyer} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="requesterEmail" className="text-sm text-muted-foreground">
            Requester Email
          </label>
          <Input 
            id="requesterEmail"
            value={invoice.requesterEmail || "requester@example.com"} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
      </div>
    </div>
  );
}
