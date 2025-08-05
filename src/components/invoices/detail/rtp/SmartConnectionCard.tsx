import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SmartConnection } from "@/types/smartConnection";
import { useNavigate } from "react-router-dom";
import { getPortalLogoUrl } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { ExternalLink } from "lucide-react";

interface SmartConnectionCardProps {
  connection: SmartConnection;
}

export function SmartConnectionCard({ connection }: SmartConnectionCardProps) {
  const navigate = useNavigate();

  const handleViewFullDetails = () => {
    navigate('/payments-relationships');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Smart Connection</CardTitle>
          <StatusBadge status={connection.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {/* Buyer and Supplier row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buyer" className="text-sm text-gray-500">Buyer</Label>
              <Input 
                id="buyer"
                value={connection.buyer.name} 
                readOnly 
                className="bg-gray-50 text-sm" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier" className="text-sm text-gray-500">Supplier</Label>
              <Input 
                id="supplier"
                value={connection.supplier.name} 
                readOnly 
                className="bg-gray-50 text-sm" 
              />
            </div>
          </div>
          
          {/* Portal and Portal User row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="portal" className="text-sm text-gray-500">Portal</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={getPortalLogoUrl(connection.portal.type)} alt={`${connection.portal.type} logo`} className="w-full h-full object-cover" />
                </div>
                <Input 
                  id="portal"
                  value={connection.portal.type} 
                  readOnly 
                  className="bg-gray-50 text-sm pl-10" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="portal-user" className="text-sm text-gray-500">Portal User</Label>
              <Input 
                id="portal-user"
                value={connection.portal.user} 
                readOnly 
                className="bg-gray-50 text-sm" 
              />
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
