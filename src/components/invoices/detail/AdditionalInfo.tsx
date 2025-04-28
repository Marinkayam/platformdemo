
import { Input } from "@/components/ui/input";
import { Invoice } from "@/types/invoice";

interface AdditionalInfoProps {
  invoice: Invoice;
}

export function AdditionalInfo({ invoice }: AdditionalInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium text-[#1A202C] mb-4">Additional Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="poNumber" className="text-sm text-[#718096] font-medium">
            PO Number
          </label>
          <Input 
            id="poNumber"
            value={invoice.poNumber || "PO-123456"} 
            readOnly 
            className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="taxId" className="text-sm text-[#718096] font-medium">
            Tax ID
          </label>
          <Input 
            id="taxId"
            value={invoice.taxId || "TAX-987654321"} 
            readOnly 
            className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="buyer" className="text-sm text-[#718096] font-medium">
            Buyer
          </label>
          <Input 
            id="buyer"
            value={invoice.buyer} 
            readOnly 
            className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="requesterEmail" className="text-sm text-[#718096] font-medium">
            Requester Email
          </label>
          <Input 
            id="requesterEmail"
            value={invoice.requesterEmail || "requester@example.com"} 
            readOnly 
            className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]"
          />
        </div>
      </div>
    </div>
  );
}
