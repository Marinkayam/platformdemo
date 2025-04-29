
import { Invoice, LineItem } from "@/types/invoice";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useParams, useNavigate } from "react-router-dom";

interface FinancialDataProps {
  invoice: Invoice;
  lineItems: LineItem[];
}

export function FinancialData({
  invoice,
  lineItems
}: FinancialDataProps) {
  const [addressesOpen, setAddressesOpen] = useState(false);
  const [lineItemsOpen, setLineItemsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to navigate to RTP data tab
  const navigateToRtpTab = () => {
    // This will preserve the current URL path but update the tab
    navigate(`/invoices/${id}?tab=rtp-data`);
    
    // Dispatch a custom event that the parent component can listen to
    const rtpTabEvent = new CustomEvent('switchTab', { 
      detail: { tab: 'rtp-data' } 
    });
    window.dispatchEvent(rtpTabEvent);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Financial Data</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={navigateToRtpTab}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
              >
                RTP Data <ExternalLink className="ml-1 h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              View the full payment request (RTP) data, including Smart Connection details, PO information, and payable/receivable fields, enriched by Monto for accurate processing in the portal.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-500">VAT/Tax ID</label>
          <Input value="77-0105228" readOnly className="bg-gray-50" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Invoice #</label>
          <Input value="26-INV-2000-1479" readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Invoice Date</label>
          <Input value="April 25, 2025" readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Amount Due</label>
          <Input value="$738,313.77 USD" readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Terms</label>
          <Input value="Net 90" readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Due Date</label>
          <Input value="July 24, 2025" readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">PO #</label>
          <Input value="0082585886" readOnly className="bg-gray-50" />
        </div>
      </div>

      {/* Addresses & Banking Information Collapsible */}
      <div className="border-t pt-4">
        <button 
          onClick={() => setAddressesOpen(!addressesOpen)}
          className="w-full flex items-center justify-between py-2 text-left font-medium"
        >
          <span>Addresses & Banking Information</span>
          {addressesOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 pt-4", 
          addressesOpen ? "block" : "hidden")}>
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
      </div>

      {/* Line Items Collapsible */}
      <div className="border-t pt-4">
        <button 
          onClick={() => setLineItemsOpen(!lineItemsOpen)}
          className="w-full flex items-center justify-between py-2 text-left font-medium"
        >
          <span>Line Items</span>
          {lineItemsOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        <div className={lineItemsOpen ? "block pt-4" : "hidden"}>
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
              {lineItems.map(item => (
                <TableRow key={item.id}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
