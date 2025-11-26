
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Invoice, LineItem } from "@/types/invoice";
import { FinancialFields } from "./financial/FinancialFields";
import { AddressesSection } from "./financial/AddressesSection";
import { LineItemsSection } from "./financial/LineItemsSection";
import { POValidationExceptions } from "./exceptions/POValidationExceptions";
import { SmartConnectionException } from "./exceptions/SmartConnectionException";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FinancialDataProps {
  invoice: Invoice;
  lineItems: LineItem[];
}

export function FinancialData({
  invoice,
  lineItems
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
        invoiceNumber={invoice.number}
        poNumber={poNumber}
        invoiceDate={invoice.invoiceDate || "2024-01-22"}
        dueDate={invoice.dueDate || "2024-01-29"}
        paymentTerms={invoice.netTerms || "Net 7"}
        currency={invoice.currency || "USD"}
        taxTotal={invoice.tax ? `$${invoice.tax.toLocaleString()}` : "$1,320.00"}
        subTotal={invoice.subtotal ? `$${invoice.subtotal.toLocaleString()}` : "$203,691.64"}
        totalAmount={`$${invoice.total.toLocaleString()}`}
        amountPaid="$205,011.64"
      />

      <AddressesSection />

      <LineItemsSection lineItems={lineItems} />
    </div>
  );
}
