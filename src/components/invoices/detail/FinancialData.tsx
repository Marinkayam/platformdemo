
import { useState } from "react";
import { Invoice, LineItem } from "@/types/invoice";
import { FinancialFields } from "./financial/FinancialFields";
import { AddressesSection } from "./financial/AddressesSection";
import { POValidationExceptions } from "./exceptions/POValidationExceptions";

interface FinancialDataProps {
  invoice: Invoice;
  lineItems: LineItem[];
}

export function FinancialData({
  invoice
}: FinancialDataProps) {
  // State for PO number - use invoice's actual PO number
  const [poNumber, setPONumber] = useState(invoice.poNumber || "");

  // Extract invoice details for validation
  const invoiceCurrency = "USD";
  const invoiceTotal = 738313.77;

  // Demo: Switch between different PO scenarios
  // You can change this to test different exceptions:
  // "PO-2024-999" - PO not found
  // "PO-2024-002" - PO is closed
  // "PO-2024-003" - Currency mismatch (EUR vs USD)
  // "PO-2024-004" - Insufficient funds (TRA too low)
  // "PO-2024-001" - Valid PO (no exceptions)

  return (
    <div className="space-y-6">
      {/* PO Validation Exceptions - Display at top */}
      <POValidationExceptions
        poNumber={poNumber}
        invoiceCurrency={invoiceCurrency}
        invoiceTotal={invoiceTotal}
        invoiceNumber={invoice.number}
        onPOUpdate={(newPO) => {
          setPONumber(newPO);
          console.log('PO updated to:', newPO);
        }}
      />

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
        poNumber={poNumber}
      />

      <AddressesSection />
    </div>
  );
}
