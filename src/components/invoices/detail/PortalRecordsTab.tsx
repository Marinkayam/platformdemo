
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
                    <div className="px-6 py-4 bg-gray-50">
                      {record.conflict && (
                        <div className="mb-4 p-3 bg-[#FFF8E1] text-[#7B5915] rounded-md">
                          ⚠️ This Portal Record contains conflicting data. Please review the details to understand discrepancies.
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-[#38415F]">Invoice Number</span>
                            <div className="text-[#38415F]">{record.id}</div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-[#38415F]">Buyer</span>
                            <div className="text-[#38415F]">Global Supplies Ltd</div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-[#38415F]">PO Number</span>
                            <div className="text-[#38415F]">PO-88991</div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-[#38415F]">Total</span>
                            <div className="text-[#38415F]">$3,100.00</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-[#38415F]">Transaction Type</span>
                            <div className="text-[#38415F]">Invoice</div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-[#38415F]">Supplier</span>
                            <div className="text-[#38415F]">Acme Corporation</div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-[#38415F]">Currency</span>
                            <div className="text-[#38415F]">EUR</div>
                          </div>
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
