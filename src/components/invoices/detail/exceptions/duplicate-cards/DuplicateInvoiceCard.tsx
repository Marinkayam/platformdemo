
import { Invoice } from "@/types/invoice";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PdfDownloadButton } from "../duplicate-table/PdfDownloadButton";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DuplicateInvoiceCardProps {
  invoice: Invoice;
  isSelected: boolean;
  onSelect: () => void;
  onContactSupport?: (invoice: Invoice) => void;
}

export function DuplicateInvoiceCard({
  invoice,
  isSelected,
  onSelect,
  onContactSupport
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

  const getRecommendation = (invoice: Invoice) => {
    if (invoice.status === "Approved by Buyer") {
      return { text: "Approved", color: "text-green-600" };
    }
    if (invoice.exceptions && invoice.exceptions.length === 0) {
      return { text: "No Issues", color: "text-green-600" };
    }
    return { text: "Review Required", color: "text-orange-600" };
  };

  const recommendation = getRecommendation(invoice);

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
        {/* Header with radio button and date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RadioGroupItem 
              value={invoice.id} 
              id={invoice.id}
              checked={isSelected}
              className="pointer-events-none"
            />
            <span className="text-sm text-gray-600">Issue Date</span>
          </div>
          <div className="flex items-center gap-2">
            <PdfDownloadButton invoice={invoice} size="icon" variant="ghost" />
            {onContactSupport && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onContactSupport(invoice);
                }}
                className="h-8 w-8"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="text-lg font-medium">{invoice.creationDate}</div>

        {/* Buyer */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Buyer</span>
          <div className="text-sm font-medium">{invoice.buyer}</div>
        </div>

        {/* Total */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
          <div className="text-lg font-semibold">${invoice.total.toLocaleString()}</div>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Status</span>
          <Badge variant="secondary" className={getStatusColor(invoice.status)}>
            {invoice.status}
          </Badge>
        </div>

        {/* Exceptions */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Exceptions</span>
          <div className="text-sm">
            {invoice.exceptions && invoice.exceptions.length > 0 
              ? `${invoice.exceptions.length} exception${invoice.exceptions.length > 1 ? 's' : ''}`
              : "None"
            }
          </div>
        </div>

        {/* Recommendation */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Recommendation</span>
          <div className={cn("text-sm font-medium", recommendation.color)}>
            {recommendation.text}
          </div>
        </div>

        {/* Owner */}
        <div className="space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Owner</span>
          <div className="text-sm">{invoice.owner}</div>
        </div>
      </CardContent>
    </Card>
  );
}
