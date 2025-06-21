
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { toast } from "@/hooks/use-toast";

interface MatchInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onMatch: (invoiceId: string) => void;
}

export function MatchInvoiceModal({ isOpen, onClose, record, onMatch }: MatchInvoiceModalProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const availableInvoices = invoiceData.filter(invoice => 
    !record.invoiceNumber && // Only show unmatched invoices
    (invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.buyer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleMatch = () => {
    if (!selectedInvoiceId) {
      toast({
        title: "Selection Required",
        description: "Please select an invoice to match with this portal record.",
        variant: "destructive",
      });
      return;
    }

    onMatch(selectedInvoiceId);
    toast({
      title: "Invoice Matched",
      description: `Portal record ${record.portalRecordId} has been matched with invoice ${selectedInvoiceId}.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Match Invoice - {record.portalRecordId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Portal Record Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Portal:</span> {record.portal}
              </div>
              <div>
                <span className="text-gray-500">Buyer:</span> {record.buyer}
              </div>
              <div>
                <span className="text-gray-500">Amount:</span> {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: record.currency,
                }).format(record.total)}
              </div>
              <div>
                <span className="text-gray-500">PO Number:</span> {record.poNumber}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="search">Search Invoices</Label>
              <Input
                id="search"
                placeholder="Search by invoice ID or buyer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="invoice-select">Select Invoice to Match</Label>
              <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an invoice..." />
                </SelectTrigger>
                <SelectContent>
                  {availableInvoices.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      {invoice.id} - {invoice.buyer} - {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: invoice.currency || 'USD',
                      }).format(invoice.total)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleMatch}>
            Match Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
