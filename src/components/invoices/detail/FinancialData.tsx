import { Invoice, LineItem } from "@/types/invoice";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
interface FinancialDataProps {
  invoice: Invoice;
  lineItems: LineItem[];
}
export function FinancialData({
  invoice,
  lineItems
}: FinancialDataProps) {
  return <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Financial Data</h2>
        <TooltipProvider>
          <Tooltip>
            
            <TooltipContent className="max-w-sm">
              View the full payment request (RTP) data, including Smart Connection details, PO information, and payable/receivable fields, enriched by Monto for accurate processing in the portal.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">VAT/Tax ID</label>
          <Input value="77-0105228" readOnly className="bg-muted/50" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Invoice #</label>
          <Input value="26-INV-2000-1479" readOnly className="bg-muted/50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Invoice Date</label>
          <Input value="April 25, 2025" readOnly className="bg-muted/50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Amount Due</label>
          <Input value="$738,313.77 USD" readOnly className="bg-muted/50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Terms</label>
          <Input value="Net 90" readOnly className="bg-muted/50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Due Date</label>
          <Input value="July 24, 2025" readOnly className="bg-muted/50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">PO #</label>
          <Input value="0082585886" readOnly className="bg-muted/50" />
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="addresses">
          <AccordionTrigger>Addresses & Banking Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4">
                <h4 className="font-medium">Bill To / Ship To:</h4>
                <p className="text-sm text-gray-600">
                  Bristol Myers Squibb Co<br />
                  Route 206 & Province Line Road<br />
                  Lawrence Township, NJ 08540, USA
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Remit To:</h4>
                <p className="text-sm text-gray-600">
                  Lockbox 15979<br />
                  Collection Center Dr.<br />
                  Chicago, IL 60693, USA
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Bank Information:</h4>
                <p className="text-sm text-gray-600">
                  Bank of America<br />
                  New York, NY
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="line-items">
          <AccordionTrigger>Line Items</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map(item => <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${item.unitPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.total.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>;
}