
import { Invoice } from "@/types/invoice";
import { DuplicateInvoiceCard } from "./DuplicateInvoiceCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DuplicateInvoiceCardsGridProps {
  invoices: Invoice[];
  selectedId?: string | null;
  onSelectChange: (id: string) => void;
}

export function DuplicateInvoiceCardsGrid({
  invoices,
  selectedId,
  onSelectChange
}: DuplicateInvoiceCardsGridProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Select the invoice you'd like to keep. Compare the details carefully before making your choice.
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {invoices.map((invoice) => (
            <DuplicateInvoiceCard
              key={invoice.id}
              invoice={invoice}
              isSelected={selectedId === invoice.id}
              onSelect={() => onSelectChange(invoice.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
