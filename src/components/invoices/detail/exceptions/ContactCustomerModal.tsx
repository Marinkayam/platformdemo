
import React, { useRef } from "react";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { toast } from "@/hooks/use-toast";

interface ContactCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
  exceptions: Exception[];
}

export function ContactCustomerModal({ 
  isOpen, 
  onClose, 
  invoice, 
  exceptions 
}: ContactCustomerModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopyContent = () => {
    if (contentRef.current) {
      const content = contentRef.current.innerText;
      navigator.clipboard.writeText(content).then(() => {
        toast({
          title: "Copied to clipboard",
          description: "You can now paste this information into your email"
        });
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Contact Customer: Invoice Information
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex justify-end mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyContent}
              className="flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" /> Copy to Clipboard
            </Button>
          </div>

          <div 
            ref={contentRef}
            className="bg-slate-50 p-4 rounded-md border border-slate-200 text-sm"
          >
            <div className="mb-4">
              <p><strong>Subject:</strong> Important: Action Required - Invoice {invoice.number}</p>
              <p><strong>To:</strong> Customer Contact</p>
            </div>
            
            <div className="mb-4">
              <p>Dear Valued Customer,</p>
              <p className="mt-2">
                We're reaching out about invoice {invoice.number} dated {invoice.creationDate} which 
                requires your attention due to the following exceptions:
              </p>

              <ul className="list-disc ml-6 my-3">
                {exceptions.map(exception => (
                  <li key={exception.id}>{exception.message}</li>
                ))}
              </ul>

              <p>
                <strong>Invoice Details:</strong>
              </p>
              <ul className="ml-6 my-2">
                <li><strong>Invoice Number:</strong> {invoice.number}</li>
                <li><strong>Amount Due:</strong> ${invoice.total.toLocaleString()}</li>
                <li><strong>Due Date:</strong> {invoice.dueDate}</li>
                <li><strong>PO Number:</strong> {invoice.poNumber || "N/A"}</li>
              </ul>

              <p className="mt-2">
                To resolve this issue, please either:
              </p>
              <ol className="list-decimal ml-6 my-2">
                <li>Provide an updated PO number with sufficient funds</li>
                <li>Confirm approval to proceed despite these exceptions</li>
              </ol>

              <p className="mt-2">
                Your prompt attention will help us process this invoice efficiently.
              </p>

              <p className="mt-4">
                Thank you,<br />
                Your Account Team
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
