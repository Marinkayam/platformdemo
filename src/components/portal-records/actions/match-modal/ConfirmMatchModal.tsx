
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { CheckCircle, ArrowRight } from "lucide-react";

interface ConfirmMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  record: PortalRecord;
  selectedInvoiceId: string;
}

export function ConfirmMatchModal({
  isOpen,
  onClose,
  onConfirm,
  record,
  selectedInvoiceId,
}: ConfirmMatchModalProps) {
  const selectedInvoice = invoiceData.find(inv => inv.id === selectedInvoiceId);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (!selectedInvoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle className="h-5 w-5 text-primary" />
            Confirm Invoice Match
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-sm text-muted-foreground">
            You are about to match the following portal record with an existing invoice. Please review the details before confirming.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {/* Portal Record Details */}
            <Card className="border-border">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-3">Portal Record</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono text-foreground">{record.portalRecordId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Portal:</span>
                    <span className="text-foreground">{record.portal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buyer:</span>
                    <span className="text-foreground">{record.buyer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(record.total, record.currency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Details */}
            <Card className="border-border">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-3">Selected Invoice</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono text-foreground">{selectedInvoice.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number:</span>
                    <span className="text-foreground">{selectedInvoice.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buyer:</span>
                    <span className="text-foreground">{selectedInvoice.buyer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-center py-2">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Match Confirmation</h4>
                  <p className="text-sm text-muted-foreground">
                    This action will link portal record <span className="font-mono text-foreground">{record.portalRecordId}</span> 
                    {' '}with invoice <span className="font-mono text-foreground">{selectedInvoice.id}</span>. 
                    The portal record status will be updated accordingly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90">
            Confirm Match
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
