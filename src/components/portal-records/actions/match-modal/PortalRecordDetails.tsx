
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortalRecord } from "@/types/portalRecord";
import { FileText, Hash, Building2, DollarSign, Calendar, Eye, EyeOff } from "lucide-react";

interface PortalRecordDetailsProps {
  record: PortalRecord;
}

export function PortalRecordDetails({ record }: PortalRecordDetailsProps) {
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Portal Record Details</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPdfPreview(!showPdfPreview)}
            >
              {showPdfPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showPdfPreview ? 'Hide' : 'Preview'} PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Hash className="h-4 w-4" />
              <span className="font-medium">Record ID:</span>
            </div>
            <p className="text-gray-900 font-mono">{record.portalRecordId}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">Portal:</span>
            </div>
            <p className="text-gray-900">{record.portal}</p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-gray-600">Buyer:</span>
            <p className="text-gray-900">{record.buyer}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">Amount:</span>
            </div>
            <p className="text-gray-900 font-semibold text-lg">{formatCurrency(record.total, record.currency)}</p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-gray-600">PO Number:</span>
            <p className="text-gray-900 font-mono">{record.poNumber}</p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-gray-600">Supplier:</span>
            <p className="text-gray-900">{record.supplierName}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Last Synced:</span>
            </div>
            <p className="text-gray-900">{formatDate(record.lastSynced)}</p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-gray-600">Currency:</span>
            <p className="text-gray-900">{record.currency}</p>
          </div>
        </div>

        {showPdfPreview && (
          <div className="border-t pt-4">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">Portal Record Document Preview</p>
              <p className="text-xs text-gray-400">PDF viewer would be implemented here</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
