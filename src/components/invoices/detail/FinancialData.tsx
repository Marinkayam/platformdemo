
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
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-[#1A202C]">Financial Data</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FileText className="h-4 w-4 text-[#718096]" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm bg-white text-[#1A202C]">
              View the full payment request (RTP) data, including Smart Connection details, PO information, and payable/receivable fields, enriched by Monto for accurate processing in the portal.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Alert className="border-l-4 border-l-[#2196F3] bg-[#E1F5FE]/30 mb-6">
        <AlertDescription className="text-[#0288D1]">
          This invoice has been validated through Smart Connections and is ready for approval in the buyer's system.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-[#718096] font-medium">VAT/Tax ID</label>
          <Input value="77-0105228" readOnly className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-[#718096] font-medium">Invoice #</label>
          <Input value="26-INV-2000-1479" readOnly className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#718096] font-medium">Invoice Date</label>
          <Input value="April 25, 2025" readOnly className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#718096] font-medium">Amount Due</label>
          <Input value="$738,313.77 USD" readOnly className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#718096] font-medium">Terms</label>
          <Input value="Net 90" readOnly className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#718096] font-medium">Due Date</label>
          <Input value="July 24, 2025" readOnly className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#718096] font-medium">PO #</label>
          <Input value="0082585886" readOnly className="bg-[#F9FAFB] border-[#E2E8F0] h-10 text-[#1A202C]" />
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="addresses" className="border-[#E2E8F0]">
          <AccordionTrigger className="text-[#1A202C] font-medium py-3 hover:text-[#7B59FF] hover:no-underline">
            Addresses & Banking Information
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4">
                <h4 className="font-medium text-[#1A202C]">Bill To / Ship To:</h4>
                <p className="text-sm text-[#4A5568]">
                  Bristol Myers Squibb Co<br />
                  Route 206 & Province Line Road<br />
                  Lawrence Township, NJ 08540, USA
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-[#1A202C]">Remit To:</h4>
                <p className="text-sm text-[#4A5568]">
                  Lockbox 15979<br />
                  Collection Center Dr.<br />
                  Chicago, IL 60693, USA
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-[#1A202C]">Bank Information:</h4>
                <p className="text-sm text-[#4A5568]">
                  Bank of America<br />
                  New York, NY
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="line-items" className="border-[#E2E8F0]">
          <AccordionTrigger className="text-[#1A202C] font-medium py-3 hover:text-[#7B59FF] hover:no-underline">
            Line Items
          </AccordionTrigger>
          <AccordionContent>
            <div className="rounded-md border border-[#E2E8F0] overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F9FAFB]">
                  <TableRow className="border-b-[#E2E8F0]">
                    <TableHead className="h-14 text-[#4A5568] font-medium">Description</TableHead>
                    <TableHead className="text-right h-14 text-[#4A5568] font-medium">Quantity</TableHead>
                    <TableHead className="text-right h-14 text-[#4A5568] font-medium">Unit Price</TableHead>
                    <TableHead className="text-right h-14 text-[#4A5568] font-medium">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lineItems.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`h-14 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F1F5F9]`}
                    >
                      <TableCell className="text-[#1A202C]">{item.description}</TableCell>
                      <TableCell className="text-right text-[#1A202C]">{item.quantity}</TableCell>
                      <TableCell className="text-right text-[#1A202C]">
                        ${item.unitPrice.toLocaleString('en-US', {
                          minimumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell className="text-right text-[#1A202C]">
                        ${item.total.toLocaleString('en-US', {
                          minimumFractionDigits: 2
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
