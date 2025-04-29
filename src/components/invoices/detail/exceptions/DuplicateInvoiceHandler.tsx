
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { DuplicateInvoiceTable } from "./DuplicateInvoiceTable";
import { InvoiceComparisonView } from "./InvoiceComparisonView";
import { ConfirmationStep } from "./ConfirmationStep";
import { duplicateInvoices } from "@/data/invoices/duplicates";
import { ArrowRight } from "lucide-react";
import { ExcludeAllModal } from "./ExcludeAllModal";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ContactCustomerModal } from "./ContactCustomerModal";

interface DuplicateInvoiceHandlerProps {
  invoice: Invoice;
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
}

export function DuplicateInvoiceHandler({ invoice, exceptions, onResolveException }: DuplicateInvoiceHandlerProps) {
  const [step, setStep] = useState<'select' | 'compare' | 'confirm'>('select');
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [keepInvoice, setKeepInvoice] = useState<Invoice | null>(null);
  const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedInvoiceForContact, setSelectedInvoiceForContact] = useState<Invoice | null>(null);
  const navigate = useNavigate();
  
  // Get the duplicate exception
  const duplicateException = exceptions.find(e => e.type === 'DUPLICATE_INVOICE');
  
  // Find the newest invoice to pre-select
  const newestInvoice = [...duplicateInvoices].sort((a, b) => 
    new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
  )[0];
  
  const handleSelectInvoices = (selected: Invoice[]) => {
    setSelectedInvoices(selected);
    if (selected.length > 0) {
      setStep('compare');
    }
  };
  
  const handleSelectInvoice = (selected: Invoice) => {
    setKeepInvoice(selected);
    setStep('confirm');
  };
  
  const handleComparisonSelect = (selected: Invoice) => {
    setKeepInvoice(selected);
    setStep('confirm');
  };
  
  const handleConfirmInvoice = () => {
    if (duplicateException && keepInvoice) {
      onResolveException(duplicateException.id, 'EXCLUDED');
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
    if (step === 'compare') {
      setStep('select');
    } else if (step === 'confirm') {
      if (selectedInvoices.length > 0) {
        setStep('compare');
      } else {
        setStep('select');
      }
      setKeepInvoice(null);
    }
  };

  // Calculate progress percentage based on current step
  const getProgressValue = () => {
    switch(step) {
      case 'select': return 33;
      case 'compare': return 66;
      case 'confirm': return 100;
      default: return 33;
    }
  };

  // Get step label
  const getStepLabel = () => {
    switch(step) {
      case 'select': return 'Step 1: Select invoices to compare';
      case 'compare': return 'Step 2: Compare and choose invoice to keep';
      case 'confirm': return 'Step 3: Confirm your selection';
      default: return '';
    }
  };
  
  return (
    <Card className="border-primary-200 shadow-md">
      <CardContent className="pt-6">
        <div>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              {getStepLabel()}
            </p>
            
            <Progress value={getProgressValue()} className="h-2 mb-4" />
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className={`${step === 'select' ? 'text-primary font-medium' : ''}`}>
                Select
              </div>
              <div className={`${step === 'compare' ? 'text-primary font-medium' : ''}`}>
                Compare
              </div>
              <div className={`${step === 'confirm' ? 'text-primary font-medium' : ''}`}>
                Confirm
              </div>
            </div>
          </div>
          
          {step === 'select' && (
            <DuplicateInvoiceTable 
              invoices={duplicateInvoices} 
              onSelect={handleSelectInvoices}
              onSelectSingle={handleSelectInvoice}
              onExcludeAll={() => setIsExcludeModalOpen(true)}
              currentInvoice={invoice}
              selectedInvoices={selectedInvoices}
              defaultSelectedInvoice={newestInvoice}
              onContactSupport={handleContactSupport}
            />
          )}
          
          {step === 'compare' && selectedInvoices.length > 0 && (
            <InvoiceComparisonView 
              invoices={selectedInvoices}
              onSelect={handleComparisonSelect}
              onBack={handleBack}
              onExcludeAll={() => setIsExcludeModalOpen(true)}
            />
          )}
          
          {step === 'confirm' && keepInvoice && (
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
