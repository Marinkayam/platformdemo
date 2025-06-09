import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";
import { SmartConnectionProps } from "./types";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SmartConnectionCardProps {
  connection: SmartConnectionProps;
}

export function SmartConnectionCard({ connection }: SmartConnectionCardProps) {
  const navigate = useNavigate();

  const getPortalLogoUrl = (portalName: string): string => {
    const logoMap: { [key: string]: string } = {
      "SAP Ariba": "ariba.png",
      "Coupa": "coupa.png",
      "Oracle Procurement": "oracle.png",
      "Tipalti": "tipalti.png",
      "Amazon Payee": "Amazon Payee.png",
      "Apple": "apple.png",
      "AT&T": "AT&T.png",
      "Bill": "bill.png",
      "Facturaxion": "Facturaxion.png",
      "Fieldglass": "Fieldglass.png",
      "iSupplier": "iSupplier.png",
      "KissFlow": "KissFlow.png",
      "Qualcomm": "Qualcomm.png",
      "Sainsburys": "Sainsburys.png",
      "Segment": "Segment.png",
      "Shopify": "shopify.png",
      "StoreNext": "StoreNext.png",
      "Taulia": "taulia.png",
      "Teradata": "Teradata.png",
      "Tungsten": "tungsten.png",
      "Walmart": "walmart.png",
    };
    return `/portal-logos/${logoMap[portalName] || portalName.toLowerCase().replace(/\s/g, '-') + '.png'}`;
  };

  const handleViewFullDetails = () => {
    navigate('/payments-relationships');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Smart Connection</CardTitle>
          <SmartConnectionStatusBadge status={connection.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Buyer and Supplier row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-gray-500 text-sm">Buyer:</span>
              <p className="font-medium text-gray-900 mt-1">{connection.buyer.name}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Supplier:</span>
              <p className="font-medium text-gray-900 mt-1">{connection.supplier.name}</p>
            </div>
          </div>
          
          {/* Portal and Portal User row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-gray-500 text-sm">Portal:</span>
              <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={getPortalLogoUrl(connection.portal.type)} alt={`${connection.portal.type} logo`} className="w-full h-full object-cover" />
                </span>
                {connection.portal.type}
              </p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Portal User:</span>
              <p className="font-medium text-gray-900 mt-1">{connection.portal.user}</p>
            </div>
          </div>
          
          {/* View Full Details link */}
          <div className="pt-2">
            <button 
              onClick={handleViewFullDetails}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline"
            >
              View Full Details
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
