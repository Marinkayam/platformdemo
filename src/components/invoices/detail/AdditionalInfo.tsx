
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
          <label className="text-sm text-gray-500">
            PO Number
          </label>
          <Input 
            value={invoice.poNumber || "PO-123456"} 
            readOnly 
            className="bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-500">
            Tax ID
          </label>
          <Input 
            value={invoice.taxId || "TAX-987654321"} 
            readOnly 
            className="bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-500">
            Buyer
          </label>
          <Input 
            value={invoice.buyer} 
            readOnly 
            className="bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-500">
            Requester Email
          </label>
          <Input 
            value={invoice.requesterEmail || "requester@example.com"} 
            readOnly 
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
