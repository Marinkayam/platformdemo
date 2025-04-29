
import { useState, useMemo } from "react";
import { Invoice } from "@/types/invoice";
import { RadioGroup } from "@/components/ui/radio-group";
import { ComparisonHeader } from "./ComparisonHeader";
import { FieldLabels } from "./FieldLabels";
import { InvoiceColumn } from "./InvoiceColumn";
import { FooterActions } from "./FooterActions";
import { COMPARISON_FIELDS } from "./constants";
import { findNewestInvoice, findDifferences } from "./utils";

interface InvoiceComparisonViewProps {
  invoices: Invoice[];
  onSelect: (invoice: Invoice) => void;
  onBack: () => void;
  onExcludeAll: () => void;
}

export function InvoiceComparisonView({ 
  invoices, 
  onSelect, 
  onBack, 
  onExcludeAll 
}: InvoiceComparisonViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Auto-select the newest invoice
  useMemo(() => {
    if (invoices.length > 0 && !selectedId) {
      // Find newest invoice by creation date
      const newest = [...invoices].sort((a, b) => 
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      )[0];
      setSelectedId(newest.id);
    }
  }, [invoices, selectedId]);
  
  // Find differences between the invoices
  const differences = useMemo(() => 
    findDifferences(invoices, COMPARISON_FIELDS), 
    [invoices]
  );
  
  // Find which invoice is newer
  const newerInvoice = useMemo(() => 
    findNewestInvoice(invoices), 
    [invoices]
  );

  const handleRadioChange = (id: string) => {
    setSelectedId(id);
  };
  
  const handleContinue = () => {
    if (selectedId) {
      const invoice = invoices.find(inv => inv.id === selectedId);
      if (invoice) {
        onSelect(invoice);
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <ComparisonHeader />

      <RadioGroup value={selectedId || ""} onValueChange={handleRadioChange}>
        <div className="grid grid-cols-3 gap-4">
          <FieldLabels 
            fields={COMPARISON_FIELDS} 
            differences={differences} 
          />
          
          {invoices.map((invoice) => {
            const isNewer = newerInvoice && invoice.id === newerInvoice.id;
            const isSelected = selectedId === invoice.id;
            
            return (
              <InvoiceColumn
                key={invoice.id}
                invoice={invoice}
                fields={COMPARISON_FIELDS}
                differences={differences}
                isNewer={isNewer}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      </RadioGroup>
      
      <FooterActions 
        onBack={onBack}
        onExcludeAll={onExcludeAll}
        onContinue={handleContinue}
        isSelectionValid={!!selectedId}
      />
    </div>
  );
}
