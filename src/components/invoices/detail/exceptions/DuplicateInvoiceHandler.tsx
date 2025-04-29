
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { DuplicateInvoiceTable } from "./duplicate-table";
import { InvoiceComparisonView, StepIndicator, SelectionAlert } from "./invoice-comparison";
import { ConfirmationStep } from "./confirmation";
import { duplicateInvoices } from "@/data/invoices/duplicates";
import { ExcludeAllModal } from "./ExcludeAllModal";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ContactCustomerModal } from "./ContactCustomerModal";
import { STEP_LABELS } from "./invoice-comparison/constants";

interface DuplicateInvoiceHandlerProps {
  invoice: Invoice;
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
}

export function DuplicateInvoiceHandler({ invoice, exceptions, onResolveException }: DuplicateInvoiceHandlerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [keepInvoice, setKeepInvoice] = useState<Invoice | null>(null);
  const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedInvoiceForContact, setSelectedInvoiceForContact] = useState<Invoice | null>(null);
  const navigate = useNavigate();
  
  // Get the duplicate exception
  const duplicateException = exceptions.find(e => e.type === 'DUPLICATE_INVOICE');
  
  // Find the newest invoice to pre-select, but don't auto-advance to step 2
  const newestInvoice = [...duplicateInvoices].sort((a, b) => 
    new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
  )[0];
  
  const handleSelectInvoices = (selected: Invoice[]) => {
    setSelectedInvoices(selected);
    if (selected.length > 0) {
      setStep(2);
    }
  };
  
  const handleSelectInvoice = (selected: Invoice) => {
    setKeepInvoice(selected);
    setStep(3);
  };
  
  const handleComparisonSelect = (selected: Invoice) => {
    setKeepInvoice(selected);
    setStep(3);
  };
  
  const handleConfirmInvoice = () => {
    if (duplicateException && keepInvoice) {
      onResolveException(duplicateException.id, 'EXCLUDED');
      
      toast({
        title: "Invoice selected",
        description: "Your selection has been saved and duplicates excluded"
      });
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

  const handleContactSupport = (invoice: Invoice) => {
    setSelectedInvoiceForContact(invoice);
    setIsContactModalOpen(true);
  };
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
      setKeepInvoice(null);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <div>
          <div className="pb-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Monto detected multiple invoices with the same number
            </h2>
            <p className="text-gray-600">
              Please compare and select the invoice you'd like to proceed with. Our system will help you identify the differences and make an informed decision.
            </p>
          </div>

          <StepIndicator currentStep={step} steps={STEP_LABELS} />
          
          {step === 1 && (
            <>
              {selectedInvoices.length > 0 && (
                <SelectionAlert count={selectedInvoices.length} />
              )}
              
              <DuplicateInvoiceTable 
                invoices={duplicateInvoices} 
                onSelect={handleSelectInvoices}
                onSelectSingle={handleSelectInvoice}
                onExcludeAll={() => setIsExcludeModalOpen(true)}
                currentInvoice={invoice}
                selectedInvoices={selectedInvoices}
                defaultSelectedInvoice={newestInvoice}
                onContactSupport={handleContactSupport}
                preventAutoAdvance={true}
              />
            </>
          )}
          
          {step === 2 && selectedInvoices.length > 0 && (
            <InvoiceComparisonView 
              invoices={selectedInvoices}
              onSelect={handleComparisonSelect}
              onBack={handleBack}
              onExcludeAll={() => setIsExcludeModalOpen(true)}
            />
          )}
          
          {step === 3 && keepInvoice && (
            <ConfirmationStep 
              invoice={keepInvoice}
              onConfirm={handleConfirmInvoice}
              onBack={handleBack}
              onExcludeAll={() => setIsExcludeModalOpen(true)}
            />
          )}
        </div>
      </CardContent>
      
      <ExcludeAllModal 
        isOpen={isExcludeModalOpen} 
        onClose={() => setIsExcludeModalOpen(false)}
        onConfirm={handleExcludeAll}
      />

      {selectedInvoiceForContact && (
        <ContactCustomerModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)}
          invoice={selectedInvoiceForContact}
          exceptions={selectedInvoiceForContact.exceptions || []}
        />
      )}
    </Card>
  );
}
