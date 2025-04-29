
import { Input } from "@/components/ui/input";

interface FinancialFieldsProps {
  vatId: string;
  invoiceNumber: string;
  invoiceDate: string;
  amountDue: string;
  terms: string;
  dueDate: string;
  poNumber: string;
}

export function FinancialFields({
  vatId,
  invoiceNumber,
  invoiceDate,
  amountDue,
  terms,
  dueDate,
  poNumber,
}: FinancialFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-sm text-gray-500">VAT/Tax ID</label>
        <Input value={vatId} readOnly className="bg-gray-50" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Invoice #</label>
        <Input value={invoiceNumber} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Invoice Date</label>
        <Input value={invoiceDate} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Amount Due</label>
        <Input value={amountDue} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Terms</label>
        <Input value={terms} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Due Date</label>
        <Input value={dueDate} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">PO #</label>
        <Input value={poNumber} readOnly className="bg-gray-50" />
      </div>
    </div>
  );
}
