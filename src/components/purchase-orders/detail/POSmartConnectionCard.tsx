import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getPortalLogoUrl } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { PurchaseOrder } from "@/types/purchase-orders";
import { FormField } from "@/components/ui/form-field";

interface POSmartConnectionCardProps {
  purchaseOrder: PurchaseOrder;
}

export function POSmartConnectionCard({ purchaseOrder }: POSmartConnectionCardProps) {
  const navigate = useNavigate();

  const handleViewScanAgents = () => {
    navigate('/scan-agents');
  };

  // Mock scan agent data - in a real app, this would come from the PO data
  const scanAgent = {
    name: "Scan Agent #1",
    type: "Monto Fetch Agent",
    status: "Connected" as const,
    portalUser: purchaseOrder.portal === "SAP Ariba" ? "supplier@acmecorp.com" :
                purchaseOrder.portal === "Coupa" ? "vendor@techsolutions.com" :
                purchaseOrder.portal === "Jaggaer" ? "global@enterprise.com" :
                "supplier@portal.com",
    lastSync: new Date().toISOString(),
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Smart Connection</CardTitle>
          <StatusBadge status={scanAgent.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Buyer and Portal row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Buyer" value={purchaseOrder.buyerName} />
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500">Portal</div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center overflow-hidden z-10">
                <img src={getPortalLogoUrl(purchaseOrder.portal)} alt={`${purchaseOrder.portal} logo`} className="w-full h-full object-cover" />
              </div>
              <div className="text-sm text-gray-900 bg-gray-50 rounded-md py-2 px-3 pl-10 border border-gray-200">
                {purchaseOrder.portal}
              </div>
            </div>
          </div>
        </div>

        {/* Scan Agent Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Agent Name" value={scanAgent.name} />
            <FormField label="Agent Type" value={scanAgent.type} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Portal User" value={scanAgent.portalUser} />
            <FormField label="Last Synced" value={new Date(scanAgent.lastSync).toLocaleString()} />
          </div>
        </div>

        {/* View Scan Agents link */}
        <div>
          <button
            onClick={handleViewScanAgents}
            className="text-primary-main hover:text-primary-700 text-sm font-medium hover:underline"
          >
            View Scan Agent
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
