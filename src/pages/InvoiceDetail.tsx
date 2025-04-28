
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, File, FileImage, Download, ZoomIn, ZoomOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { invoiceData } from "@/data/invoices";

export default function InvoiceDetail() {
  const { id } = useParams();
  const [showLineItems, setShowLineItems] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  // Find the invoice by id
  const invoice = invoiceData.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Invoice not found</h2>
        <Button asChild>
          <Link to="/invoices">Back to Invoices</Link>
        </Button>
      </div>
    );
  }

  // Mock data for line items and attachments
  const lineItems = [
    { id: "1", description: "Software License", quantity: 5, unitPrice: 99.99, total: 499.95 },
    { id: "2", description: "Implementation Services", quantity: 10, unitPrice: 150, total: 1500 },
    { id: "3", description: "Support Package", quantity: 1, unitPrice: 350.25, total: 350.25 }
  ];

  const attachments = [
    { id: "1", fileName: "Invoice_PDF.pdf", fileType: "pdf", url: "#" },
    { id: "2", fileName: "Supporting_Document.pdf", fileType: "pdf", url: "#" },
    { id: "3", fileName: "Receipt_Image.jpg", fileType: "image", url: "#" }
  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/invoices">
              <ArrowLeft className="mr-2" />
              Back to Invoices
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{invoice.number}</h1>
            <p className="text-muted-foreground">Owner: {invoice.owner}</p>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {invoice.isOverdue && (
              <Badge variant="destructive" className="rounded-full">Overdue</Badge>
            )}
            <Badge variant="outline" className="rounded-full">
              {invoice.documentType || 'Invoice'}
            </Badge>
            <StatusBadge status={invoice.status} />
          </div>
        </div>
      </div>

      {/* Financial Data Section */}
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

      {/* Line Items Accordion */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <Collapsible open={showLineItems} onOpenChange={setShowLineItems}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Line Items</h2>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {showLineItems ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                {showLineItems ? "Hide" : "Show"} Line Items
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-4">
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
                {lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Additional Information Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Additional Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="poNumber" className="text-sm text-muted-foreground">
              PO Number
            </label>
            <Input 
              id="poNumber"
              value={invoice.poNumber || "PO-123456"} 
              readOnly 
              className="bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="taxId" className="text-sm text-muted-foreground">
              Tax ID
            </label>
            <Input 
              id="taxId"
              value={invoice.taxId || "TAX-987654321"} 
              readOnly 
              className="bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="buyer" className="text-sm text-muted-foreground">
              Buyer
            </label>
            <Input 
              id="buyer"
              value={invoice.buyer} 
              readOnly 
              className="bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="requesterEmail" className="text-sm text-muted-foreground">
              Requester Email
            </label>
            <Input 
              id="requesterEmail"
              value={invoice.requesterEmail || "requester@example.com"} 
              readOnly 
              className="bg-muted/50"
            />
          </div>
        </div>
      </div>

      {/* Attachments Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Attachments</h2>
        
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => setShowPdfViewer(true)}
          >
            <File className="mr-2 h-4 w-4" /> 
            View Invoice PDF
          </Button>
          
          <Separator />
          
          <ul className="space-y-3">
            {attachments.map((attachment) => (
              <li key={attachment.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(attachment.fileType)}
                  <span>{attachment.fileName}</span>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <Dialog open={showPdfViewer} onOpenChange={setShowPdfViewer}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Invoice Preview</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{Math.round(zoomLevel * 100)}%</span>
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-white border rounded-md flex-1 overflow-auto p-8">
            <div 
              className="bg-white mx-auto max-w-2xl transition-all duration-200 ease-in-out"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            >
              {/* Mock PDF Content */}
              <div className="border border-gray-200 rounded-lg p-8">
                <div className="flex justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold">INVOICE</h1>
                    <p className="text-gray-500">{invoice.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Company Name Inc.</p>
                    <p className="text-sm text-gray-500">123 Business St.</p>
                    <p className="text-sm text-gray-500">City, State 12345</p>
                  </div>
                </div>
                
                <div className="mb-6 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-2">Bill To:</h3>
                    <p>{invoice.buyer}</p>
                    <p className="text-sm text-gray-500">Client Address</p>
                    <p className="text-sm text-gray-500">City, State 54321</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="mb-2">
                      <span className="font-semibold">Invoice Date:</span>
                      <span className="ml-2">{invoice.creationDate}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Due Date:</span>
                      <span className="ml-2">{invoice.dueDate}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Status:</span>
                      <span className="ml-2">{invoice.status}</span>
                    </div>
                  </div>
                </div>
                
                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b border-gray-300 text-left">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-right">Quantity</th>
                      <th className="py-2 text-right">Unit Price</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-3">{item.description}</td>
                        <td className="py-3 text-right">{item.quantity}</td>
                        <td className="py-3 text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 text-right">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-1">
                      <span>Subtotal</span>
                      <span>${(invoice.subtotal || invoice.total * 0.9).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Tax</span>
                      <span>${(invoice.tax || invoice.total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 font-bold">
                      <span>Total</span>
                      <span>${invoice.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
