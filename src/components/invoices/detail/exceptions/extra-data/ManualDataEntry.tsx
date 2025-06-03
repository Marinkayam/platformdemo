
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualDataEntryProps {
  invoiceDate: string;
  customerName: string;
  onInvoiceDateChange: (value: string) => void;
  onCustomerNameChange: (value: string) => void;
}

export function ManualDataEntry({
  invoiceDate,
  customerName,
  onInvoiceDateChange,
  onCustomerNameChange,
}: ManualDataEntryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Invoice Date Input */}
      <div className="space-y-2">
        <Label htmlFor="invoice-date" className="text-sm font-medium text-gray-900">
          Invoice Date
        </Label>
        <Input
          id="invoice-date"
          type="text"
          placeholder="please add the invoice data"
          value={invoiceDate}
          onChange={(e) => onInvoiceDateChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Customer Name Input */}
      <div className="space-y-2">
        <Label htmlFor="customer-name" className="text-sm font-medium text-gray-900">
          Customer Name
        </Label>
        <Input
          id="customer-name"
          type="text"
          placeholder="Please insert Customer Name"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
