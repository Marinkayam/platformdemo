import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/portalsDashboardUtils";

interface TopBuyersCardProps {
  topBuyers: [string, number][];
  topOpenPO?: any;
}

export function TopBuyersCard({ topBuyers, topOpenPO }: TopBuyersCardProps) {
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Top Buyers</CardTitle>
        <div className="p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20">
          <Award className="h-4 w-4 text-[#22C55E]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold text-[#061237]">{`${formatCurrency(topBuyers.reduce((sum, [, total]) => sum + Number(total), 0))} (${topBuyers.length} buyers)`}</div>
        <div className="space-y-3">
          <p className="text-sm text-[#586079] leading-relaxed">Buyers leading in open invoice value</p>
          <div className="space-y-1">
            {topBuyers.slice(0, 3).map(([buyer, total], idx) => (
              <div key={buyer} className="text-sm text-[#061237] flex justify-between items-center">
                <span className={idx === 0 ? "font-semibold" : "font-normal"}>{buyer}</span>
                <span className="text-xs text-[#586079]">{formatCurrency(Number(total))}</span>
              </div>
            ))}
          </div>
          {topOpenPO && (
            <div className="flex justify-end pt-1">
              <span className="text-xs text-[#7B59FF] font-medium hover:underline cursor-pointer flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
