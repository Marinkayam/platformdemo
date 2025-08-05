
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExceptionBanner } from "@/components/ui/exception-banner";
import { WandSparkles, Sparkles } from "lucide-react";
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { duplicateInvoices } from "@/data/invoices/duplicates";
import { ExcludeAllModal } from "./ExcludeAllModal";
import { ConfirmationDialog } from "./confirmation/ConfirmationDialog";
import { DuplicateInvoiceCardsGrid } from "./duplicate-cards";

interface DuplicateInvoiceHandlerProps {
  invoice: Invoice;
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
}

export function DuplicateInvoiceHandler({ invoice, exceptions, onResolveException }: DuplicateInvoiceHandlerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get the duplicate exception
  const duplicateException = exceptions.find(e => e.type === 'DUPLICATE_INVOICE');
  
  // Find the newest invoice to pre-select
  const newestInvoice = [...duplicateInvoices].sort((a, b) => 
    new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
  )[0];
  
  // Pre-select the newest invoice
  useState(() => {
    if (newestInvoice && !selectedId) {
      setSelectedId(newestInvoice.id);
    }
  });
  
  const handleSelectChange = (id: string) => {
    setSelectedId(id);
  };
  
  const handleKeepSelected = () => {
    if (!selectedId) {
      toast({
        title: "Selection required",
        description: "Please select an invoice to keep.",
        variant: "destructive",
      });
      return;
    }
    
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmSelection = () => {
    if (duplicateException) {
      onResolveException(duplicateException.id, 'MARK_RESOLVED');
      
      toast({
        title: "Invoice selected",
        description: "Your selection has been saved and duplicates resolved"
      });
      
      // Navigate back to invoices list after a short delay
      setTimeout(() => {
        navigate("/invoices");
      }, 1500);
    }
  };

  const handleExcludeAll = () => {
    if (duplicateException) {
      onResolveException(duplicateException.id, 'EXCLUDED');
      
      toast({
        title: "Duplicates excluded",
        description: "All duplicate invoices have been marked as excluded"
      });
      
      // Navigate back to invoices list after a short delay
      setTimeout(() => {
        navigate("/invoices");
      }, 1500);
    }
  };

  const selectedInvoice = duplicateInvoices.find(inv => inv.id === selectedId);

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Header with title and chip */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-black">
                Resolve Exception
              </h2>
              <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                Duplication
              </Badge>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p style={{ color: '#38415F' }} className="text-sm">
                Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
              </p>
            </div>
          </div>

          <ExceptionBanner 
            variant="error" 
            icon="alert"
            title="Duplication Exceptions"
          >
            Monto detected multiple invoices with the same number
          </ExceptionBanner>

          {/* Resolution guidance without background container */}
          <div className="flex items-start gap-3">
            <WandSparkles className="mt-0.5 flex-shrink-0" style={{ color: '#7B59FF' }} size={16} />
            <div>
              <p style={{ color: '#38415F' }} className="text-sm">
                Please select the invoice you'd like to proceed with. Click on a card to select it, then choose to keep your selection or exclude all duplicates.
              </p>
            </div>
          </div>

          <DuplicateInvoiceCardsGrid 
            invoices={duplicateInvoices}
            selectedId={selectedId}
            onSelectChange={handleSelectChange}
          />
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsExcludeModalOpen(true)}
            >
              Exclude All
            </Button>
            
            <Button
              onClick={handleKeepSelected}
              disabled={!selectedId}
              className="bg-primary hover:bg-primary/90"
            >
              Keep Selected Invoice
            </Button>
          </div>
        </div>
      </CardContent>
      
      <ExcludeAllModal 
        isOpen={isExcludeModalOpen} 
        onClose={() => setIsExcludeModalOpen(false)}
        onConfirm={handleExcludeAll}
      />

      {selectedInvoice && (
        <ConfirmationDialog
          invoice={selectedInvoice}
          isOpen={isConfirmationModalOpen}
          onOpenChange={setIsConfirmationModalOpen}
          onConfirm={handleConfirmSelection}
        />
      )}
    </Card>
  );
}
