import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListChecks, ArrowRight } from "lucide-react";
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
        <div className="text-2xl font-bold text-[#061237]">{formatCurrency(openPOsTotal)}
          <span className="text-sm font-normal ml-1">({openPOsCount} POs)</span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-[#586079] leading-relaxed">From {openPOsCount} open POs</p>
        </div>
        <div className="flex justify-end pt-1">
            <span className="text-xs text-[#7B59FF] font-medium hover:underline cursor-pointer flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </span>
          </div>
      </CardContent>
    </Card>
  );
}
