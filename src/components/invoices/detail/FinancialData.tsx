
import { Input } from "@/components/ui/input";
import { Invoice } from "@/types/invoice";

interface FinancialDataProps {
  invoice: Invoice;
}

export function FinancialData({ invoice }: FinancialDataProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Financial Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="total" className="text-sm text-muted-foreground">
            Total Amount
          </label>
          <Input 
            id="total"
            value={`$${invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="dueDate" className="text-sm text-muted-foreground">
            Due Date
          </label>
          <Input 
            id="dueDate"
            value={invoice.dueDate} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="creationDate" className="text-sm text-muted-foreground">
            Creation Date
          </label>
          <Input 
            id="creationDate"
            value={invoice.creationDate} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subtotal" className="text-sm text-muted-foreground">
            Subtotal
          </label>
          <Input 
            id="subtotal"
            value={`$${(invoice.subtotal || invoice.total * 0.9).toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="tax" className="text-sm text-muted-foreground">
            Tax
          </label>
          <Input 
            id="tax"
            value={`$${(invoice.tax || invoice.total * 0.1).toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="currency" className="text-sm text-muted-foreground">
            Currency
          </label>
          <Input 
            id="currency"
            value={invoice.currency || "USD"} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="paymentTerms" className="text-sm text-muted-foreground">
            Payment Terms
          </label>
          <Input 
            id="paymentTerms"
            value={invoice.paymentTerms || "Net 30"} 
            readOnly 
            className="bg-muted/50"
          />
        </div>
      </div>
    </div>
  );
}
