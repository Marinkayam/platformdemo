
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

interface Invoice {
  id: string;
  number?: string;
  buyer: string;
  total: number;
  currency?: string;
  dueDate: string;
  status: string;
  owner: string;
}

interface SelectedInvoiceDetailsProps {
  selectedInvoice: Invoice | undefined;
  onPreviewPdf: () => void;
}

export function SelectedInvoiceDetails({
  selectedInvoice,
  onPreviewPdf,
}: SelectedInvoiceDetailsProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (!selectedInvoice) return null;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Selected Invoice Details
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewPdf}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Preview PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Invoice ID</Label>
            <Input value={selectedInvoice.id} readOnly className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Invoice Number</Label>
            <Input value={selectedInvoice.number || ''} readOnly className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
            <Input value={selectedInvoice.status} readOnly className="bg-muted/50 capitalize" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Amount</Label>
            <Input 
              value={formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')} 
              readOnly 
              className="bg-muted/50 font-semibold" 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Due Date</Label>
            <Input value={selectedInvoice.dueDate} readOnly className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Buyer</Label>
            <Input value={selectedInvoice.buyer} readOnly className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Owner</Label>
            <Input value={selectedInvoice.owner} readOnly className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Currency</Label>
            <Input value={selectedInvoice.currency || 'USD'} readOnly className="bg-muted/50" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
