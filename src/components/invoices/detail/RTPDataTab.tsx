import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, Clock, ExternalLink, X, RefreshCw } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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

const mockSmartConnection: SmartConnectionProps = {
  status: "Live",
  buyer: {
    name: "Acme Corporation",
    id: ""
  },
  supplier: {
    name: "Global Supplies Ltd",
    id: ""
  },
  portal: {
    type: "Coupa",
    reference: ""
  },
  lastUpdated: "2025-04-28T15:23:44Z"
};

const mockPOInformation: POInformationProps = {
  number: "",
  status: "Valid",
  customerName: "Acme Corporation",
  portalInfo: {
    type: "Coupa",
    reference: ""
  },
  orderDate: "2025-03-15",
  totalAmount: 15000,
  totalInvoiced: 7500,
  amountLeft: 7500,
  paymentTerms: "Net 30",
  currency: "USD",
  buyerReference: ""
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
  return type.substring(0, 1);
};

const SmartConnectionAlert = ({ exceptions }: { exceptions?: string[] }) => {
  if (!exceptions || exceptions.length === 0) return null;
  
  return (
    <Alert className="mb-6 bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-800">Connection Issues Detected</AlertTitle>
      <AlertDescription className="text-amber-700 flex flex-col md:flex-row md:justify-between md:items-center">
        <ul className="list-disc pl-5 mt-2 space-y-1 mb-4 md:mb-0">
          {exceptions.map((exception, i) => (
            <li key={i} className="text-sm">{exception}</li>
          ))}
        </ul>
        <Button 
          variant="secondary" 
          size="sm"
          className="flex items-center gap-2 bg-amber-200 hover:bg-amber-300 text-amber-800 border-amber-300 mt-2 md:mt-0 ml-auto md:ml-4"
        >
          <RefreshCw className="h-4 w-4" /> Update Agent
        </Button>
      </AlertDescription>
    </Alert>
  );
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
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Buyer</label>
            <Input 
              value={connection.buyer.name}
              readOnly 
              disabled
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Supplier</label>
            <Input 
              value={connection.supplier.name}
              readOnly 
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <label className="text-sm text-gray-500">Portal</label>
          <div className="flex items-center space-x-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {getPortalIcon(connection.portal.type)}
            </span>
            <Input 
              value={connection.portal.type}
              readOnly 
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Last updated: {new Date(connection.lastUpdated).toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Button variant="outline" size="sm" className="text-primary flex items-center gap-2">
          View Full Details <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { id: 1, name: "RTP Prepared", completed: true, current: false, date: "Apr 25" },
    { id: 2, name: "Awaiting SC", completed: true, current: false, date: "Apr 26" },
    { id: 3, name: "RTP Sent", completed: false, current: true, date: "Apr 28" },
    { id: 4, name: "Approved", completed: false, current: false, date: "" },
    { id: 5, name: "Paid", completed: false, current: false, date: "" }
  ];
  
  // Calculate progress percentage
  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / (totalSteps - 1)) * 100; // Exclude the last step for better visual

  return (
    <Card className="mb-6">
      <CardHeader className="pb-1 pt-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-gray-700">Process Timeline</CardTitle>
          <span className="text-xs text-muted-foreground">
            {completedSteps}/{totalSteps}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-1">
        <div>
          {/* Progress bar */}
          <Progress value={progress} className="h-1 mb-2" />
          
          <div className="relative">
            <div className="flex justify-between">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={cn(
                    "flex flex-col items-center group relative z-10 transition-all duration-200",
                    step.completed || step.current ? "cursor-default" : "opacity-70"
                  )}
                >
                  <div className={cn(
                    "h-4 w-4 rounded-full flex items-center justify-center transition-all duration-300",
                    step.completed ? "bg-primary shadow-sm shadow-primary/20 text-white" : 
                    step.current ? "bg-white border-2 border-primary text-primary" : 
                    "bg-gray-100 text-gray-400"
                  )}>
                    {step.completed ? (
                      <Check className="h-2 w-2" />
                    ) : (
                      <span className="font-medium text-[9px]">{step.id}</span>
                    )}
                  </div>
                  <span className={cn(
                    "text-[9px] mt-1 font-medium text-center transition-all duration-200 max-w-[40px]",
                    step.completed ? "text-primary" : 
                    step.current ? "text-primary" : 
                    "text-gray-500"
                  )}>
                    {step.name}
                  </span>
                  {step.date && (
                    <span className="text-[8px] mt-0.5 text-gray-500">{step.date}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const POInformationCard = ({ po = mockPOInformation }: { po?: POInformationProps }) => {
  const { toast } = useToast();

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Purchase Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <h3 className="text-base font-medium">
            PO #
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Customer</label>
            <Input value={po.customerName} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Portal/SC</label>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {getPortalIcon(po.portalInfo.type)}
              </span>
              <Input value={po.portalInfo.type} readOnly disabled className="bg-gray-50" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Order Date</label>
            <Input value={new Date(po.orderDate).toLocaleDateString()} readOnly disabled className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Total Amount</label>
            <Input value={`$${po.totalAmount.toLocaleString()}`} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Total Invoiced</label>
            <Input value={`$${po.totalInvoiced.toLocaleString()}`} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Amount Left</label>
            <Input value={`$${po.amountLeft.toLocaleString()}`} readOnly disabled className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Payment Terms</label>
            <Input value={po.paymentTerms} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Currency</label>
            <Input value={po.currency} readOnly disabled className="bg-gray-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Buyer Reference</label>
            <Input value={po.buyerReference} readOnly disabled className="bg-gray-50" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="text-primary flex items-center gap-2">
          View Full Details <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
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
  const connectionWithIssue: SmartConnectionProps = {
    ...mockSmartConnection,
    status: "Unavailable" as ConnectionStatus,
    exceptions: [
      "Portal User Credentials are missing",
      "Last sync attempt failed at 15:23"
    ]
  };

  return (
    <div className="space-y-6">
      <SmartConnectionAlert exceptions={connectionWithIssue.exceptions} />
      <SmartConnectionCard connection={connectionWithIssue} />
      <ProcessTimeline />
      <POInformationCard />
      <RelatedInvoicesTable />
    </div>
  );
}
