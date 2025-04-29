
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { DuplicateInvoiceTable } from "./DuplicateInvoiceTable";
import { InvoiceComparisonView } from "./InvoiceComparisonView";
import { ConfirmationStep } from "./ConfirmationStep";
import { duplicateInvoices } from "@/data/invoices/duplicates";

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
  
  const handleSelectInvoices = (selected: Invoice[]) => {
    setSelectedInvoices(selected);
    setStep('compare');
  };
  
  const handleCompareComplete = (selected: Invoice) => {
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
      setStep('compare');
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Duplicate Invoice Resolution</h3>
              <p className="text-sm text-muted-foreground">
                {step === 'select' && 'Step 1: Select invoices to compare'}
                {step === 'compare' && 'Step 2: Compare invoices and select one to keep'}
                {step === 'confirm' && 'Step 3: Confirm your selection'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2.5 h-2.5 rounded-full ${step === 'select' ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`w-2.5 h-2.5 rounded-full ${step === 'compare' ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`w-2.5 h-2.5 rounded-full ${step === 'confirm' ? 'bg-primary' : 'bg-gray-300'}`}></div>
            </div>
          </div>
          
          {step === 'select' && (
            <DuplicateInvoiceTable 
              invoices={duplicateInvoices} 
              onSelect={handleSelectInvoices}
              currentInvoice={invoice}
            />
          )}
          
          {step === 'compare' && (
            <InvoiceComparisonView 
              invoices={selectedInvoices}
              onSelect={handleCompareComplete}
              onBack={handleBack}
            />
          )}
          
          {step === 'confirm' && (
            <ConfirmationStep 
              invoice={keepInvoice!}
              onConfirm={handleConfirmInvoice}
              onBack={handleBack}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
