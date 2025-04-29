
import { useState, useMemo } from "react";
import { Invoice } from "@/types/invoice";
import { RadioGroup } from "@/components/ui/radio-group";
import { ComparisonHeader } from "./ComparisonHeader";
import { FieldLabels } from "./FieldLabels";
import { InvoiceColumn } from "./InvoiceColumn";
import { FooterActions } from "./FooterActions";
import { COMPARISON_FIELDS } from "./constants";
import { findNewestInvoice, findDifferences, categorizeFields } from "./utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SelectionAlert } from "./SelectionAlert";
import { DifferenceExplanation } from "./DifferenceExplanation";

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
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  
  // Auto-select the newest invoice
  useMemo(() => {
    if (invoices.length > 0 && !selectedId) {
      const newest = findNewestInvoice(invoices);
      if (newest) {
        setSelectedId(newest.id);
      }
    }
  }, [invoices, selectedId]);
  
  // Find differences between the invoices
  const differences = useMemo(() => 
    findDifferences(invoices, COMPARISON_FIELDS), 
    [invoices]
  );
  
  // Categorize fields by importance and if they have differences
  const categorizedFields = useMemo(() => 
    categorizeFields(COMPARISON_FIELDS, differences),
    [differences]
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

  // Get fields to display based on filter setting
  const fieldsToDisplay = useMemo(() => {
    if (showOnlyDifferences) {
      return COMPARISON_FIELDS.filter(field => differences[field.key as string]);
    }
    return COMPARISON_FIELDS;
  }, [differences, showOnlyDifferences]);

  // Count the number of differences
  const differenceCount = Object.values(differences).filter(Boolean).length;
  
  return (
    <div className="space-y-6">
      <ComparisonHeader />
      
      {differenceCount > 0 && (
        <DifferenceExplanation 
          count={differenceCount}
          fields={COMPARISON_FIELDS.filter(field => differences[field.key as string])}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-gray-700">
          {invoices.length} invoices selected
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="show-differences"
            checked={showOnlyDifferences}
            onCheckedChange={setShowOnlyDifferences}
          />
          <Label htmlFor="show-differences" className="text-sm">
            Show only differences
          </Label>
        </div>
      </div>

      <RadioGroup value={selectedId || ""} onValueChange={handleRadioChange}>
        <div className="grid grid-cols-3 gap-4">
          <FieldLabels 
            fields={fieldsToDisplay} 
            differences={differences} 
          />
          
          {invoices.map((invoice) => {
            const isNewer = newerInvoice && invoice.id === newerInvoice.id;
            const isSelected = selectedId === invoice.id;
            
            return (
              <InvoiceColumn
                key={invoice.id}
                invoice={invoice}
                fields={fieldsToDisplay}
                differences={differences}
                isNewer={isNewer}
                isSelected={isSelected}
                invoices={invoices}
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
