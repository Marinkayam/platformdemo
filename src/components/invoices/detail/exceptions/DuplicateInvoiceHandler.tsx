
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { DuplicateInvoiceTable } from "./DuplicateInvoiceTable";
import { InvoiceComparisonView } from "./InvoiceComparisonView";
import { ConfirmationStep } from "./ConfirmationStep";
import { duplicateInvoices } from "@/data/invoices/duplicates";
import { ArrowRight } from "lucide-react";

interface DuplicateInvoiceHandlerProps {
  invoice: Invoice;
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT') => void;
}

export function DuplicateInvoiceHandler({ invoice, exceptions, onResolveException }: DuplicateInvoiceHandlerProps) {
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [keepInvoice, setKeepInvoice] = useState<Invoice | null>(null);
  
  // Get the duplicate exception
  const duplicateException = exceptions.find(e => e.type === 'DUPLICATE_INVOICE');
  
  const handleSelectInvoices = (selected: Invoice[]) => {
    setSelectedInvoices(selected);
    if (selected.length === 1) {
      setKeepInvoice(selected[0]);
      setStep('confirm');
    }
  };
  
  const handleSelectInvoice = (selected: Invoice) => {
    setKeepInvoice(selected);
    setStep('confirm');
  };
  
  const handleConfirmInvoice = () => {
    if (duplicateException && keepInvoice) {
      onResolveException(duplicateException.id, 'MARK_RESOLVED');
    }
  };
  
  const handleBack = () => {
    if (step === 'confirm') {
      setStep('select');
      setKeepInvoice(null);
    }
  };
  
  return (
    <Card className="border-amber-200 shadow-md">
      <CardContent className="pt-6">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-amber-700">Duplicate Invoice Resolution</h3>
              <p className="text-sm text-muted-foreground">
                {step === 'select' && 'Step 1: Select the invoice to keep'}
                {step === 'confirm' && 'Step 2: Confirm your selection'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'select' ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}>1</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirm' ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}>2</div>
            </div>
          </div>
          
          {step === 'select' && (
            <DuplicateInvoiceTable 
              invoices={duplicateInvoices} 
              onSelect={handleSelectInvoices}
              onSelectSingle={handleSelectInvoice}
              currentInvoice={invoice}
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
