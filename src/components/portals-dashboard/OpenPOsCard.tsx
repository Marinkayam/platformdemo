
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListChecks } from "lucide-react";
import { formatCurrency } from "@/utils/portalsDashboardUtils";

interface OpenPOsCardProps {
  openPOsCount: number;
  openPOsTotal: number;
  topOpenPO?: any;
}

export function OpenPOsCard({ openPOsCount, openPOsTotal, topOpenPO }: OpenPOsCardProps) {
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Open POs</CardTitle>
        <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
          <ListChecks className="h-4 w-4 text-[#7B59FF]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-[#061237]">{formatCurrency(openPOsTotal)}</div>
        <div className="space-y-2">
          <p className="text-sm text-[#586079] leading-relaxed">From {openPOsCount} open POs</p>
          {topOpenPO && (
            <p className="text-xs text-[#061237] font-medium">
              Top: {topOpenPO.buyerName} via {topOpenPO.portal}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
