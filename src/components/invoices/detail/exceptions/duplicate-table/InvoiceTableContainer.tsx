
import { Invoice } from "@/types/invoice";
import { Table } from "@/components/ui/table";
import { RadioGroup } from "@/components/ui/radio-group";
import { InvoiceTableHeader } from "./TableHeader";
import { InvoiceTableBody } from "./TableBody";

interface InvoiceTableContainerProps {
  invoices: Invoice[];
  selectedId: string | null;
  onSelectChange: (id: string) => void;
  onContactSupport?: (invoice: Invoice) => void;
}

export function InvoiceTableContainer({
  invoices,
  selectedId,
  onSelectChange,
  onContactSupport,
}: InvoiceTableContainerProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <RadioGroup value={selectedId || ""} onValueChange={onSelectChange}>
        <Table>
          <InvoiceTableHeader />
          <InvoiceTableBody
            invoices={invoices}
            selectedId={selectedId}
            formatDate={formatDate}
            onContactSupport={onContactSupport}
          />
        </Table>
      </RadioGroup>
    </div>
  );
}
