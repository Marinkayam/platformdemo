
import { Input } from "@/components/ui/input";
import { Invoice } from "@/types/invoice";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface AdditionalInfoProps {
  invoice: Invoice;
}

export function AdditionalInfo({ invoice }: AdditionalInfoProps) {
  return (
    <Card className="rounded-xl shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <CardTitle className="text-lg font-medium mb-5">Extra Data</CardTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              PO Number
            </label>
            <Input 
              value={invoice.poNumber || "PO-123456"} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Tax ID
            </label>
            <Input 
              value={invoice.taxId || "TAX-987654321"} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Buyer
            </label>
            <Input 
              value={invoice.buyer} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Requester Email
            </label>
            <Input 
              value={invoice.requesterEmail || "requester@example.com"} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
