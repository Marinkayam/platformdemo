
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PortalRecord } from "@/types/portalRecord";
import { FileText, Eye, EyeOff } from "lucide-react";

interface CompactSummaryBarProps {
  record: PortalRecord;
}

export function CompactSummaryBar({ record }: CompactSummaryBarProps) {
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium text-blue-900">Matching:</span>
          <span className="font-mono">{record.portalRecordId}</span>
          <span>·</span>
          <span className="font-semibold">{formatCurrency(record.total, record.currency)}</span>
          <span>·</span>
          <span>{record.portal}</span>
          <span>·</span>
          <span>{record.buyer}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPdfPreview(!showPdfPreview)}
        >
          {showPdfPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPdfPreview ? 'Hide' : 'Preview'} PDF
        </Button>
      </div>
      
      {showPdfPreview && (
        <div className="mt-4 border-t pt-4">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">Portal Record Document Preview</p>
            <p className="text-xs text-gray-400">PDF viewer would be implemented here</p>
          </div>
        </div>
      )}
    </div>
  );
}
