
import { Input } from "@/components/ui/input";

interface FinancialFieldsProps {
  invoiceNumber: string;
  poNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  currency: string;
  taxTotal: string;
  subTotal: string;
  totalAmount: string;
  amountPaid: string;
}

export function FinancialFields({
  invoiceNumber,
  poNumber,
  invoiceDate,
  dueDate,
  paymentTerms,
  currency,
  taxTotal,
  subTotal,
  totalAmount,
  amountPaid,
}: FinancialFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Invoice Number</label>
        <Input value={invoiceNumber} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">PO Number</label>
        <Input
          value={poNumber}
          readOnly
          className="bg-gray-50"
          placeholder="No PO number"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Invoice Date</label>
        <Input value={invoiceDate} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Due Date</label>
        <Input value={dueDate} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Payment Terms</label>
        <Input value={paymentTerms} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Currency</label>
        <Input value={currency} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Tax Total</label>
        <Input value={taxTotal} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Sub Total</label>
        <Input value={subTotal} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Total Amount</label>
        <Input value={totalAmount} readOnly className="bg-gray-50 font-semibold" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Amount Paid</label>
        <Input value={amountPaid} readOnly className="bg-gray-50 font-semibold" />
      </div>
    </div>
  );
}
