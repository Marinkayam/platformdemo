
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, TriangleAlert } from "lucide-react";
import { portalRecordsData } from "@/data/portalRecords";
import { PortalRecord } from "@/types/portalRecord";

interface PortalRecordsTabProps {
  invoiceId: string;
}

const LabelValue = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-sm text-[#8C92A3]">{label}</div>
    <div className="text-base text-[#38415F] font-medium">{value}</div>
  </div>
);

export function PortalRecordsTab({ invoiceId }: PortalRecordsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter portal records for the current invoice
  const relevantRecords = portalRecordsData.filter(
    record => record.invoiceNumber === invoiceId
  );

  // Auto-expand the Primary record on mount
  useEffect(() => {
    const primaryRecord = relevantRecords.find(record => record.matchType === "Primary");
    if (primaryRecord) {
      setExpandedId(primaryRecord.id);
    }
  }, [relevantRecords]);

  const getStatusBadge = (status: PortalRecord['status']) => {
    const isSuccess = status === "Approved" || status === "Paid";
    return (
      <Badge 
        className={
          isSuccess 
            ? "bg-[#E6F4EA] text-[#007737] hover:bg-[#E6F4EA]" 
            : "bg-[#FFEBEE] text-[#D32F2F] hover:bg-[#FFEBEE]"
        }
      >
        {status}
      </Badge>
    );
  };

  const getMatchTypeDisplay = (matchType: PortalRecord['matchType']) => {
    if (matchType === "Primary") {
      return (
        <span className="text-[#7B59FF] font-medium">
          ⭐ Primary
        </span>
      );
    }
    return <span className="text-[#8C92A3]">Alternate</span>;
  };

  const toggleExpanded = (recordId: string) => {
    setExpandedId(expandedId === recordId ? null : recordId);
  };

  if (relevantRecords.length === 0) {
    return (
      <Card className="rounded-2xl bg-white shadow-md p-6">
        <div className="text-center text-[#8C92A3] py-10">
          No portal records found.
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl bg-white shadow-md p-0">
      <div className="p-6 pb-0">
        <p className="text-sm text-[#8C92A3] mb-4">
          These records were pulled from buyer portals and linked to this invoice. Each record displays key invoice attributes and its current status in the portal.
        </p>
      </div>
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex text-sm font-medium text-[#8C92A3] uppercase tracking-wide">
          <div className="flex-1">Portal Record</div>
          <div className="w-24">Portal</div>
          <div className="w-24">Status</div>
          <div className="w-28">Match Type</div>
          <div className="w-32">Last Updated</div>
          <div className="w-24">Actions</div>
        </div>
      </div>

      {/* Records */}
      <div className="divide-y divide-[#E2E8F0]">
        {relevantRecords.map((record) => (
          <div key={record.id}>
            {/* Record Row */}
            <div className="px-6 py-4 flex items-center">
              <div className="flex-1 flex items-center gap-2">
                {record.conflict && (
                  <TriangleAlert className="w-4 h-4 text-[#FF9800]" />
                )}
                <span className="font-medium text-[#38415F]">{record.id}</span>
              </div>
              <div className="w-24 text-[#38415F]">{record.portal}</div>
              <div className="w-24">{getStatusBadge(record.status)}</div>
              <div className="w-28">{getMatchTypeDisplay(record.matchType)}</div>
              <div className="w-32 text-sm text-[#8C92A3]">
                {format(new Date(record.updated), "MMM d, yyyy")}
              </div>
              <div className="w-24">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex gap-1 items-center hover:bg-gray-50"
                  onClick={() => toggleExpanded(record.id)}
                >
                  {expandedId === record.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Details
                </Button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === record.id && (
              <div className="px-6 pb-6">
                {record.conflict && (
                  <div className="bg-[#FFF8E1] text-[#7B5915] text-sm rounded-md p-4 mb-4">
                    ⚠️ This Portal Record contains conflicting data. Please review the details to understand discrepancies.
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg border border-[#E2E8F0]">
                  <div className="space-y-3">
                    <LabelValue label="Invoice Number" value={record.id} />
                    <LabelValue label="Buyer" value="Global Supplies Ltd" />
                    <LabelValue label="PO Number" value="PO-88991" />
                    <LabelValue label="Total" value="$3,100.00" />
                  </div>
                  <div className="space-y-3">
                    <LabelValue label="Transaction Type" value="Invoice" />
                    <LabelValue label="Supplier" value="Acme Corporation" />
                    <LabelValue label="Currency" value="EUR" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
