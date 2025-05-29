
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
        <span className="font-bold text-[#7B59FF]">
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
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-[#8C92A3] py-10">
          No portal records found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 pb-0">
        <p className="text-sm text-[#8C92A3] mb-4">
          These records were pulled from buyer portals and linked to this invoice. Each record displays key invoice attributes and its current status in the portal.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Portal Record</TableHead>
            <TableHead>Portal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Match Type</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {relevantRecords.map((record) => (
            <Collapsible 
              key={record.id}
              open={expandedId === record.id}
              onOpenChange={() => toggleExpanded(record.id)}
            >
              <TableRow className="h-14">
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>{record.portal}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell>{getMatchTypeDisplay(record.matchType)}</TableCell>
                <TableCell>{format(new Date(record.updated), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-gray-50"
                    >
                      Details
                    </Button>
                  </CollapsibleTrigger>
                </TableCell>
              </TableRow>
              <CollapsibleContent>
                <TableRow>
                  <TableCell colSpan={6} className="p-0">
                    <div className="p-6">
                      {record.conflict && (
                        <div className="bg-[#FFF8E1] text-[#7B5915] text-sm rounded-md p-4 mb-4">
                          ⚠️ This Portal Record contains conflicting data. Please review the details to understand discrepancies.
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg mt-2 border-t border-[#E2E8F0]">
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
                  </TableCell>
                </TableRow>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
