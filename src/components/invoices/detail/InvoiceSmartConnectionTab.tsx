
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Invoice } from "@/types/invoice";
import { mockSmartConnections } from "@/data/smartConnections";
import { getPortalLogoUrl } from "@/lib/utils";
import { format } from "date-fns";

interface InvoiceSmartConnectionTabProps {
  invoice?: Invoice;
}

export function InvoiceSmartConnectionTab({ invoice }: InvoiceSmartConnectionTabProps) {
  const navigate = useNavigate();
  
  // Use first mock connection for demo - in real app this would be fetched based on invoice
  const connection = mockSmartConnections[0];
  
  // Mock PO data with last updated timestamp
  const mockPO = {
    number: "PO-2024-001234",
    status: "Valid" as const,
    lastUpdated: "2024-12-20T14:30:00Z",
    remainingAmount: 5250.00,
    currency: "USD"
  };

  const handleViewFullDetails = () => {
    navigate('/payments-relationships');
  };

  const formatLastUpdated = (timestamp: string) => {
    return format(new Date(timestamp), "MMM dd, yyyy 'at' h:mm a");
  };

  return (
    <div className="space-y-6">
      {/* Smart Connection Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Smart Connection Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Connection Name</label>
              <Input 
                value={`${connection.buyer.name} → ${connection.supplier.name}`}
                readOnly 
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Connection Status</label>
              <div>
                <StatusBadge status={connection.status} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Submission Portal</label>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={getPortalLogoUrl(connection.portal.type)} 
                    alt={`${connection.portal.type} logo`} 
                    className="w-full h-full object-cover" 
                  />
                </span>
                <Input 
                  value={connection.portal.type}
                  readOnly 
                  className="bg-gray-50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Submission Entity</label>
              <Input 
                value={`${connection.supplier.name} (Supplier)`}
                readOnly 
                className="bg-gray-50"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              variant="ghost" 
              onClick={handleViewFullDetails}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View Full Smart Connection Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PO Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Purchase Order Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">PO Number</label>
              <Input 
                value={mockPO.number}
                readOnly 
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500">PO Status</label>
              <div className="flex flex-col gap-1">
                <StatusBadge status={mockPO.status} />
                <span className="text-xs text-gray-500">
                  Last updated: {formatLastUpdated(mockPO.lastUpdated)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Remaining Amount</label>
              <Input 
                value={`${mockPO.currency} ${mockPO.remainingAmount.toLocaleString()}`}
                readOnly 
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
