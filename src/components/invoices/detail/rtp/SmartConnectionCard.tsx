
import React from "react";
import { ExternalLink } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { SmartConnectionProps, PortalType } from "./types";

const getConnectionStatusColor = (status: SmartConnectionProps["status"]) => {
  switch (status) {
    case "Live": return "bg-green-100 text-green-600";
    case "In Process": return "bg-yellow-100 text-yellow-600";
    case "Unavailable": return "bg-red-100 text-red-600";
    case "Inactive": return "bg-gray-100 text-gray-600";
  }
};

const getPortalIcon = (type: PortalType) => {
  return type.substring(0, 1);
};

export const SmartConnectionCard = ({ connection }: { connection: SmartConnectionProps }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Smart Connection</CardTitle>
          <Badge className={cn("text-xs", getConnectionStatusColor(connection.status))}>
            {connection.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Main grid layout with consistent spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Buyer Field */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500">Buyer</Label>
            <Input 
              value={connection.buyer.name}
              readOnly 
              disabled
              className="bg-gray-50"
            />
          </div>
          
          {/* Supplier Field */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500">Supplier</Label>
            <Input 
              value={connection.supplier.name}
              readOnly 
              disabled
              className="bg-gray-50"
            />
          </div>
          
          {/* Portal Field with icon */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500">Portal</Label>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 bg-primary/10">
                <AvatarFallback className="text-xs font-bold text-primary">
                  {getPortalIcon(connection.portal.type)}
                </AvatarFallback>
              </Avatar>
              <Input 
                value={connection.portal.type}
                readOnly 
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
          
          {/* Portal User Field */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500">Portal User</Label>
            <Input 
              value={connection.portal.user || "Not assigned"}
              readOnly 
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Button variant="outline" size="sm" className="text-primary flex items-center gap-2">
          View Full Details <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
