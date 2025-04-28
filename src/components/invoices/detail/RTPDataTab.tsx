
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, Clock, ExternalLink, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type ConnectionStatus = "Live" | "In Process" | "Unavailable" | "Inactive";
type ValidationStatus = "Valid" | "Invalid" | "Pending";
type PortalType = "Coupa" | "Ariba" | "Tipalti" | "SAP" | "Oracle";

interface SmartConnectionProps {
  status: ConnectionStatus;
  buyer: {
    name: string;
    id: string;
  };
  supplier: {
    name: string;
    id: string;
  };
  portal: {
    type: PortalType;
    reference: string;
  };
  lastUpdated: string;
  exceptions?: string[];
}

interface POInformationProps {
  number: string;
  status: ValidationStatus;
  customerName: string;
  portalInfo: {
    type: PortalType;
    reference: string;
  };
  orderDate: string;
  totalAmount: number;
  totalInvoiced: number;
  amountLeft: number;
  paymentTerms: string;
  currency: string;
  buyerReference: string;
}

interface RelatedInvoiceProps {
  id: string;
  number: string;
  date: string;
  total: number;
  status: string;
  paymentStatus: string;
}

// Sample mock data
const mockSmartConnection: SmartConnectionProps = {
  status: "Live",
  buyer: {
    name: "Acme Corporation",
    id: "BUY-12345"
  },
  supplier: {
    name: "Global Supplies Ltd",
    id: "SUP-78901"
  },
  portal: {
    type: "Coupa",
    reference: "CP-89745"
  },
  lastUpdated: "2025-04-28T15:23:44Z"
};

const mockPOInformation: POInformationProps = {
  number: "PO-29876",
  status: "Valid",
  customerName: "Acme Corporation",
  portalInfo: {
    type: "Coupa",
    reference: "CP-89745"
  },
  orderDate: "2025-03-15",
  totalAmount: 15000,
  totalInvoiced: 7500,
  amountLeft: 7500,
  paymentTerms: "Net 30",
  currency: "USD",
  buyerReference: "ACM-REF-001"
};

const mockRelatedInvoices: RelatedInvoiceProps[] = [
  {
    id: "1",
    number: "INV-001",
    date: "2025-04-10",
    total: 3500,
    status: "Approved",
    paymentStatus: "Paid"
  },
  {
    id: "2",
    number: "INV-002",
    date: "2025-04-20",
    total: 4000,
    status: "Processing",
    paymentStatus: "Pending"
  }
];

// Helper functions
const getConnectionStatusColor = (status: ConnectionStatus) => {
  switch (status) {
    case "Live": return "bg-green-100 text-green-600";
    case "In Process": return "bg-yellow-100 text-yellow-600";
    case "Unavailable": return "bg-red-100 text-red-600";
    case "Inactive": return "bg-gray-100 text-gray-600";
  }
};

const getValidationStatusIcon = (status: ValidationStatus) => {
  switch (status) {
    case "Valid": return <Check className="h-4 w-4 text-green-600" />;
    case "Invalid": return <X className="h-4 w-4 text-red-600" />;
    case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />;
  }
};

const getPortalIcon = (type: PortalType) => {
  // In a real implementation, you could use actual portal logos
  return type.substring(0, 1);
};

const SmartConnectionCard = ({ connection = mockSmartConnection }: { connection?: SmartConnectionProps }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Smart Connection</CardTitle>
          <Badge className={cn("text-xs", getConnectionStatusColor(connection.status))}>
            {connection.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Buyer</h4>
            <p className="font-medium">{connection.buyer.name}</p>
            <p className="text-sm text-muted-foreground">{connection.buyer.id}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Supplier</h4>
            <p className="font-medium">{connection.supplier.name}</p>
            <p className="text-sm text-muted-foreground">{connection.supplier.id}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Portal</h4>
          <div className="flex items-center space-x-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {getPortalIcon(connection.portal.type)}
            </span>
            <div>
              <p className="font-medium">{connection.portal.type}</p>
              <p className="text-sm text-muted-foreground">{connection.portal.reference}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Last updated: {new Date(connection.lastUpdated).toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Button variant="link" className="p-0 text-primary flex items-center">
          View Full Details <ExternalLink className="ml-1 h-3 w-3" />
          <span className="ml-1 text-xs text-muted-foreground">(Coming Soon)</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

const SmartConnectionAlert = ({ exceptions }: { exceptions?: string[] }) => {
  if (!exceptions || exceptions.length === 0) return null;
  
  return (
    <Alert className="mb-6 bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-800">Connection Issues Detected</AlertTitle>
      <AlertDescription className="text-amber-700">
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {exceptions.map((exception, i) => (
            <li key={i} className="text-sm">{exception}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

const POInformationCard = ({ po = mockPOInformation }: { po?: POInformationProps }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Purchase Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <span className="mr-2">{getValidationStatusIcon(po.status)}</span>
          <h3 className="text-base font-medium">
            PO #{po.number} 
            <span className={cn(
              "ml-2 text-sm",
              po.status === "Valid" ? "text-green-600" : 
              po.status === "Invalid" ? "text-red-600" : "text-yellow-600"
            )}>
              ({po.status})
            </span>
          </h3>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 ml-2" 
                onClick={() => {
                  navigator.clipboard.writeText(po.number);
                  toast({
                    title: "Copied to clipboard",
                    description: `PO number ${po.number} has been copied`,
                  });
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy PO number</TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer</h4>
            <p>{po.customerName}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Portal/SC</h4>
            <div className="flex items-center space-x-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {getPortalIcon(po.portalInfo.type)}
              </span>
              <span>{po.portalInfo.type}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Order Date</h4>
            <p>{new Date(po.orderDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Amount</h4>
            <p>${po.totalAmount.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Invoiced</h4>
            <p>${po.totalInvoiced.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Amount Left</h4>
            <p>${po.amountLeft.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Terms</h4>
            <p>{po.paymentTerms}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Currency</h4>
            <p>{po.currency}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Buyer Reference</h4>
          <p>{po.buyerReference}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="text-primary">
          View Full Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { id: 1, name: "RTP Prepared", completed: true, current: false },
    { id: 2, name: "Awaiting SC", completed: true, current: false },
    { id: 3, name: "RTP Sent", completed: false, current: true },
    { id: 4, name: "Approved", completed: false, current: false },
    { id: 5, name: "Paid", completed: false, current: false }
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Process Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline bar */}
          <div className="absolute top-5 left-5 w-[calc(100%-2.5rem)] h-0.5 bg-gray-200"></div>
          
          {/* Timeline steps */}
          <div className="flex justify-between relative">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  step.completed ? "bg-primary text-white" : 
                  step.current ? "bg-primary/20 text-primary border-2 border-primary" : 
                  "bg-gray-100 text-gray-400"
                )}>
                  {step.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="font-medium">{step.id}</span>
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-2 font-medium text-center",
                  step.completed || step.current ? "text-primary" : "text-gray-500"
                )}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RelatedInvoicesTable = ({ invoices = mockRelatedInvoices }: { invoices?: RelatedInvoiceProps[] }) => {
  if (!invoices || invoices.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Related Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No related invoices found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Related Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.total.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    invoice.status === "Approved" ? "bg-green-100 text-green-600" :
                    invoice.status === "Rejected" ? "bg-red-100 text-red-600" :
                    "bg-yellow-100 text-yellow-600"
                  )}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    invoice.paymentStatus === "Paid" ? "border-green-300 text-green-600" :
                    "border-yellow-300 text-yellow-600"
                  )}>
                    {invoice.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export function RTPDataTab() {
  // For demonstration, we're using the mock data
  // In a real app, this would come from props or API calls

  // We're showing an example of a connection with an issue
  const connectionWithIssue = {
    ...mockSmartConnection,
    status: "Unavailable",
    exceptions: [
      "Authentication token expired on April 27, 2025",
      "Last sync attempt failed at 15:23"
    ]
  };

  return (
    <div className="space-y-6">
      <SmartConnectionCard connection={connectionWithIssue} />
      <SmartConnectionAlert exceptions={connectionWithIssue.exceptions} />
      <POInformationCard />
      <ProcessTimeline />
      <RelatedInvoicesTable />
    </div>
  );
}
