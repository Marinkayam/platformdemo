
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

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <div className="text-xs text-[#8C92A3]">{label}</div>
    <div className="text-sm font-medium text-[#38415F] bg-[#F1F5F9] rounded-md py-2 px-3">
      {value}
    </div>
  </div>
);

// Additional mock records for testing - updated to match current invoice and include all required properties
const additionalMockRecords: PortalRecord[] = [
  {
    id: "INV-10021301-PR1",
    portal: "Coupa",
    status: "Paid",
    matchType: "Alternate",
    updated: "2024-04-08",
    conflict: false,
    invoiceNumber: "1",
    buyer: "Global Supplies Ltd",
    total: 3100.00,
    poNumber: "PO-88991",
    supplierName: "Acme Corporation",
    type: "Alternate",
    currency: "EUR"
  },
  {
    id: "INV-10021301-PR2",
    portal: "Coupa",
    status: "Rejected",
    matchType: "Alternate",
    updated: "2024-04-08",
    conflict: true,
    invoiceNumber: "1",
    buyer: "Global Supplies Ltd",
    total: 3100.00,
    poNumber: "PO-88991",
    supplierName: "Acme Corporation",
    type: "Conflict",
    currency: "EUR"
  }
];

export function PortalRecordsTab({ invoiceId }: PortalRecordsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Combine original records with additional mock records
  const allRecords = [...portalRecordsData, ...additionalMockRecords];
  
  // Filter portal records for the current invoice
  const relevantRecords = allRecords.filter(
    record => record.invoiceNumber === invoiceId
  );

  // Auto-expand Primary record on mount
  useEffect(() => {
    const primary = relevantRecords.find(r => r.matchType === "Primary");
    if (primary) {
      setExpandedId(primary.id);
    }
  }, [invoiceId]);

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
        <span className="text-sm text-[#7B59FF] font-medium">
          Primary
        </span>
      );
    }
    return <span className="text-sm text-[#8C92A3]">Alternate</span>;
  };

  const toggleExpanded = (recordId: string) => {
    console.log("Expanded ID:", expandedId, "Clicked ID:", recordId);
    setExpandedId(prev => prev === recordId ? null : recordId);
  };

  if (relevantRecords.length === 0) {
    return (
      <Card className="rounded-2xl bg-white">
        <div className="text-center text-[#8C92A3] py-10">
          No portal records found.
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl bg-white overflow-hidden">
      <div className="p-6 pb-0">
        <p className="text-sm text-[#8C92A3] mb-4">
          These records were pulled from buyer portals and linked to this invoice. Each record displays key invoice attributes and its current status in the portal.
        </p>
      </div>
      
      {/* Header - removed "Actions" text, adjusted to 5 columns */}
      <div className="bg-[#F8FAFC] px-6 py-3 h-[48px] border-b border-[#E2E8F0]">
        <div className="grid grid-cols-6 items-center text-sm font-bold text-[#38415F]">
          <div>Portal Record</div>
          <div>Portal</div>
          <div>Status</div>
          <div>Match Type</div>
          <div>Last Updated</div>
          <div className="text-right"></div>
        </div>
      </div>

      {/* Records */}
      <div className="divide-y divide-[#E2E8F0]">
        {relevantRecords.map((record) => (
          <div key={record.id}>
            {/* Record Row - Clickable */}
            <div 
              className="grid grid-cols-6 items-center h-[56px] px-6 hover:bg-[#F8FAFC] cursor-pointer"
              onClick={() => toggleExpanded(record.id)}
            >
              <div className="flex items-center gap-2">
                {record.conflict && (
                  <TriangleAlert className="w-4 h-4 text-[#FF9800]" />
                )}
                <span className="text-sm font-medium text-[#38415F]">{record.id}</span>
              </div>
              <div className="text-sm text-[#8C92A3]">{record.portal}</div>
              <div>{getStatusBadge(record.status)}</div>
              <div>{getMatchTypeDisplay(record.matchType)}</div>
              <div className="text-sm text-[#8C92A3]">
                {format(new Date(record.updated), "MMM d, yyyy")}
              </div>
              <div className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex gap-1 items-center ml-auto pointer-events-none"
                >
                  {expandedId === record.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Details
                </Button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === record.id && (
              <div className="px-6 pt-6 pb-4">
                {record.conflict && (
                  <div className="bg-[#FFF8E1] text-[#7B5915] text-sm rounded-md p-4 mb-4">
                    ⚠️ This Portal Record contains conflicting data. Please review the details to understand discrepancies.
                  </div>
                )}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-[#38415F] mb-4">Portal Record Details</h3>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Invoice Number" value={record.id} />
                    <Field label="Transaction Type" value="Invoice" />
                    <Field label="Buyer" value={record.buyer} />
                    <Field label="Supplier" value={record.supplierName} />
                    <Field label="PO Number" value={record.poNumber} />
                    <Field label="Currency" value={record.currency || "USD"} />
                    <Field label="Total" value={`$${record.total.toLocaleString()}`} />
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
