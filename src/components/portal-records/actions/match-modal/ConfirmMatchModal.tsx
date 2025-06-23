
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
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="px-8 pt-8 pb-6">
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-foreground">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            Confirm Invoice Match
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-8">
          <p className="text-muted-foreground">
            You are about to match the following portal record with an existing invoice. Please review the details before confirming.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {/* Portal Record Details */}
            <Card className="border-border bg-muted/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 text-lg">Portal Record</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">ID:</span>
                    <span className="font-mono text-foreground font-medium">{record.portalRecordId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Portal:</span>
                    <span className="text-foreground font-medium">{record.portal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Buyer:</span>
                    <span className="text-foreground font-medium">{record.buyer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Amount:</span>
                    <span className="font-bold text-foreground text-lg">
                      {formatCurrency(record.total, record.currency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Details */}
            <Card className="border-border bg-muted/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 text-lg">Selected Invoice</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">ID:</span>
                    <span className="font-mono text-foreground font-medium">{selectedInvoice.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Number:</span>
                    <span className="text-foreground font-medium">{selectedInvoice.number}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Buyer:</span>
                    <span className="text-foreground font-medium">{selectedInvoice.buyer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Amount:</span>
                    <span className="font-bold text-foreground text-lg">
                      {formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-center py-4">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-lg">Match Confirmation</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    This action will link portal record <span className="font-mono text-foreground font-medium">{record.portalRecordId}</span> 
                    {' '}with invoice <span className="font-mono text-foreground font-medium">{selectedInvoice.id}</span>. 
                    The portal record status will be updated accordingly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 px-8 py-6 bg-muted/30 border-t border-border">
          <Button variant="outline" onClick={onClose} className="px-6">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90 px-8">
            Confirm Match
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
