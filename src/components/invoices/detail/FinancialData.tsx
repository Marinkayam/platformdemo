
import { Invoice, LineItem } from "@/types/invoice";
import { FinancialFields } from "./financial/FinancialFields";
import { AddressesSection } from "./financial/AddressesSection";

interface FinancialDataProps {
  invoice: Invoice;
  lineItems: LineItem[];
}

export function FinancialData({
  invoice
}: FinancialDataProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium">Financial Data</h2>
        <p className="text-sm text-gray-500 mt-1">Extracted with monto document AI</p>
      </div>

      <FinancialFields
        vatId="77-0105228"
        invoiceNumber="26-INV-2000-1479"
        invoiceDate="April 25, 2025"
        amountDue="$738,313.77 USD"
        terms="Net 90"
        dueDate="July 24, 2025"
        poNumber="0082585886"
      />

      <AddressesSection />
    </div>
  );
}
