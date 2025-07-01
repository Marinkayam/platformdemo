import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Server, Plus } from "lucide-react";
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalsScannedCardProps {
  portalsCount: number;
  recentPortals: string[];
}

export function PortalsScannedCard({ portalsCount, recentPortals }: PortalsScannedCardProps) {
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#3B82F6]/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Portals Scanned</CardTitle>
        <div className="p-2.5 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20">
          <Server className="h-4 w-4 text-[#3B82F6]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-[#061237]">{portalsCount}</div>
        <div className="space-y-3">
          <p className="text-sm text-[#586079] leading-relaxed">Active portals synced in the latest scan</p>
          <div className="flex items-center gap-1 flex-wrap">
            {recentPortals.map((portal) => (
              <img
                key={portal}
                src={getPortalLogoUrl(portal)}
                alt={portal + ' logo'}
                className="w-6 h-6 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                title={portal}
              />
            ))}
          </div>
          {/* <div className="flex justify-end pt-1">
            <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA] h-auto p-0 font-medium text-xs">
              <Link to="/payments-relationships/new" className="flex items-center gap-1">
                <Plus className="h-3 w-3" />
                Add portal user
              </Link>
            </Button>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
