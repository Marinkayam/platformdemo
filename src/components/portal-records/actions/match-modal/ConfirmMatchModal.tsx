
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { CheckCircle, ArrowRight, X } from "lucide-react";

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
      <DialogContent className="max-w-2xl p-0 overflow-hidden animate-scale-in">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-lg font-semibold text-foreground">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center animate-fade-in">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              Confirm Match
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-muted/50">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2 animate-fade-in">
            Review the details below to confirm linking this portal record with the selected invoice.
          </p>
        </DialogHeader>
        
        <div className="px-6 py-6 space-y-6">
          {/* Match Overview Card */}
          <Card className="border-2 border-primary/20 bg-primary/5 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1 animate-slide-in-from-left">
                  <div className="text-xs text-muted-foreground mb-1">Portal Record</div>
                  <div className="font-mono text-sm font-semibold">{record.portalRecordId}</div>
                  <div className="text-xs text-muted-foreground mt-1">{record.portal}</div>
                </div>
                
                <div className="mx-6 animate-scale-in">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                <div className="text-center flex-1 animate-slide-in-from-right">
                  <div className="text-xs text-muted-foreground mb-1">Invoice</div>
                  <div className="font-mono text-sm font-semibold">{selectedInvoice.number}</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedInvoice.buyer}</div>
                </div>
              </div>
              
              <div className="flex justify-center animate-fade-in">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}
                  </div>
                  <div className="text-xs text-muted-foreground">Amount</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-muted/30 animate-slide-in-from-left">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-medium text-sm">Portal Record</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buyer:</span>
                    <span className="font-medium">{record.buyer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="font-medium">{record.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{record.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 animate-slide-in-from-right">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-medium text-sm">Invoice</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">{selectedInvoice.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{selectedInvoice.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{selectedInvoice.owner}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-muted/20 border-t animate-fade-in">
          <Button variant="outline" onClick={onClose} className="px-6 hover:bg-muted/50 transition-colors">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90 px-8 hover:scale-105 transition-all duration-200">
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm Match
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
