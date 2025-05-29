
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

// Additional mock records for testing - updated to match current invoice
const additionalMockRecords: PortalRecord[] = [
  {
    id: "INV-10021301-PR1",
    portal: "Coupa",
    status: "Paid",
    matchType: "Alternate",
    updated: "2024-04-08",
    conflict: false,
    invoiceNumber: "1"
  },
  {
    id: "INV-10021301-PR2",
    portal: "Coupa",
    status: "Rejected",
    matchType: "Alternate",
    updated: "2024-04-08",
    conflict: true,
    invoiceNumber: "1"
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
        <span className="text-sm text-[#7B59FF] font-medium">
          ⭐ Primary
        </span>
      );
    }
    return <span className="text-sm text-[#8C92A3]">Alternate</span>;
  };

  const toggleExpanded = (recordId: string) => {
    setExpandedId(expandedId === recordId ? null : recordId);
  };

  const handleRowClick = (recordId: string, event: React.MouseEvent) => {
    // Prevent expansion when clicking the Details button
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    toggleExpanded(recordId);
  };

  if (relevantRecords.length === 0) {
    return (
      <div className="rounded-xl border bg-white">
        <div className="text-center text-[#8C92A3] py-10">
          No portal records found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#8C92A3]">
        These records were pulled from buyer portals and linked to this invoice. Each record displays key invoice attributes and its current status in the portal.
      </p>
      
      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-white">
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                Portal Record
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                Portal
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                Status
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                Match Type
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                Last Updated
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {relevantRecords.map((record) => (
              <>
                <TableRow 
                  key={record.id}
                  className="h-14 hover:bg-gray-50 cursor-pointer transition-colors bg-white"
                  onClick={(e) => handleRowClick(record.id, e)}
                >
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {record.conflict && (
                        <TriangleAlert className="w-4 h-4 text-[#FF9800]" />
                      )}
                      <span className="text-sm font-medium text-[#38415F]">{record.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="text-sm text-[#8C92A3]">{record.portal}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {getStatusBadge(record.status)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {getMatchTypeDisplay(record.matchType)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="text-sm text-[#8C92A3]">
                      {format(new Date(record.updated), "MMM d, yyyy")}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex gap-1 items-center hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(record.id);
                      }}
                    >
                      {expandedId === record.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Details
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Expanded Details */}
                {expandedId === record.id && (
                  <TableRow>
                    <TableCell colSpan={6} className="px-6 pt-6 pb-4">
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
                          <Field label="Buyer" value="Global Supplies Ltd" />
                          <Field label="Supplier" value="Acme Corporation" />
                          <Field label="PO Number" value="PO-88991" />
                          <Field label="Currency" value="EUR" />
                          <Field label="Total" value="$3,100.00" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
