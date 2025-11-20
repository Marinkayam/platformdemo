
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Invoice, LineItem } from "@/types/invoice";
import { FinancialFields } from "./financial/FinancialFields";
import { AddressesSection } from "./financial/AddressesSection";
import { POValidationExceptions } from "./exceptions/POValidationExceptions";
import { SmartConnectionException } from "./exceptions/SmartConnectionException";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  // Check for smart connection exception
  const smartConnectionException = invoice.exceptions?.find(
    exc => exc.type === 'SMART_CONNECTION_EXCEPTION'
  );

  return (
    <div className="space-y-6">
      {/* Smart Connection Exception - Display at top */}
      {smartConnectionException && (
        <SmartConnectionException
          exception={smartConnectionException}
          portal={invoice.portal}
        />
      )}

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

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Financial Data</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 cursor-help">
                <Sparkles className="h-3 w-3 text-primary-main" />
                <p className="text-sm text-primary-main font-light">Extracted with monto ai</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>This financial data was automatically extracted from the invoice using Monto's AI document processing technology</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
