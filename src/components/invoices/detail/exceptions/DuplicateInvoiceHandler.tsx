
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { DuplicateInvoiceTable } from "./DuplicateInvoiceTable";
import { InvoiceComparisonView } from "./InvoiceComparisonView";
import { ConfirmationStep } from "./ConfirmationStep";
import { duplicateInvoices } from "@/data/invoices/duplicates";
import { Check, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DuplicateInvoiceHandlerProps {
  invoice: Invoice;
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT') => void;
}

export function DuplicateInvoiceHandler({ invoice, exceptions, onResolveException }: DuplicateInvoiceHandlerProps) {
  const [step, setStep] = useState<'select' | 'compare' | 'confirm'>('select');
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [keepInvoice, setKeepInvoice] = useState<Invoice | null>(null);
  
  // Get the duplicate exception
  const duplicateException = exceptions.find(e => e.type === 'DUPLICATE_INVOICE');

  // Auto-select the most recent invoice
  useEffect(() => {
    if (duplicateInvoices.length > 0 && selectedInvoices.length === 0) {
      const sorted = [...duplicateInvoices].sort((a, b) => 
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
      setSelectedInvoices([sorted[0]]);
    }
  }, []);
  
  const handleSelectInvoices = (selected: Invoice[]) => {
    setSelectedInvoices(selected);
    if (selected.length === 2) {
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
      onResolveException(duplicateException.id, 'MARK_RESOLVED');
    }
  };
  
  const handleBack = () => {
    if (step === 'compare') {
      setStep('select');
    } else if (step === 'confirm') {
      if (selectedInvoices.length === 2) {
        setStep('compare');
      } else {
        setStep('select');
      }
      setKeepInvoice(null);
    }
  };

  // Function to dispatch a custom event to switch to invoice-data tab
  const switchToInvoiceData = () => {
    const event = new CustomEvent('switchTab', { 
      detail: { tab: 'invoice-data' } 
    });
    window.dispatchEvent(event);
  };

  // Switch to invoice data tab on component mount
  useEffect(() => {
    switchToInvoiceData();
  }, []);
  
  return (
    <Card className="border-primary-200 shadow-md">
      <CardContent className="pt-6">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-primary-700">Duplicate Invoice Exception</h3>
              <p className="text-sm text-muted-foreground">
                {step === 'select' && 'Step 1: Select invoices to compare'}
                {step === 'compare' && 'Step 2: Compare and choose invoice to keep'}
                {step === 'confirm' && 'Step 3: Confirm your selection'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'select' ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'compare' ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirm' ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
            </div>
          </div>
          
          {step === 'select' && (
            <DuplicateInvoiceTable 
              invoices={duplicateInvoices} 
              onSelect={handleSelectInvoices}
              onSelectSingle={handleSelectInvoice}
              currentInvoice={invoice}
              selectedInvoices={selectedInvoices}
            />
          )}
          
          {step === 'compare' && selectedInvoices.length === 2 && (
            <InvoiceComparisonView 
              invoices={selectedInvoices}
              onSelect={handleComparisonSelect}
              onBack={handleBack}
            />
          )}
          
          {step === 'confirm' && keepInvoice && (
            <ConfirmationStep 
              invoice={keepInvoice}
              onConfirm={handleConfirmInvoice}
              onBack={handleBack}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
