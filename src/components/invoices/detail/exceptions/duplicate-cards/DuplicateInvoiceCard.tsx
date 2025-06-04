
import { Invoice } from "@/types/invoice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PdfDownloadButton } from "../duplicate-table/PdfDownloadButton";
import { cn } from "@/lib/utils";

interface DuplicateInvoiceCardProps {
  invoice: Invoice;
  isSelected: boolean;
  onSelect: () => void;
}

export function DuplicateInvoiceCard({
  invoice,
  isSelected,
  onSelect
}: DuplicateInvoiceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Action":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Approved by Buyer":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Format date with time
  const formatDateWithTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card 
      className={cn(
        "min-w-[300px] cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected 
          ? "border-2 border-primary ring-2 ring-primary/20" 
          : "border border-gray-200 hover:border-gray-300"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header with date and PDF download */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-normal">Issue Date</span>
          <PdfDownloadButton invoice={invoice} size="icon" variant="ghost" />
        </div>

        {/* Date with time */}
        <div className="text-sm font-normal text-gray-900">{formatDateWithTime(invoice.creationDate)}</div>

        {/* Buyer */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Buyer</span>
          <div className="text-sm font-normal text-gray-900">{invoice.buyer}</div>
        </div>

        {/* Total */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Total</span>
          <div className="text-sm font-normal text-gray-900">${invoice.total.toLocaleString()}</div>
        </div>

        {/* Exceptions */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Exceptions</span>
          <div className="text-sm font-normal text-gray-900">
            {invoice.exceptions && invoice.exceptions.length > 0 
              ? `${invoice.exceptions.length} exception${invoice.exceptions.length > 1 ? 's' : ''}`
              : "None"
            }
          </div>
        </div>

        {/* Owner */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Owner</span>
          <div className="text-sm font-normal text-gray-900">{invoice.owner}</div>
        </div>
      </CardContent>
    </Card>
  );
}
