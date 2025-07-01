import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, ArrowRight } from "lucide-react";

interface BuyersFoundCardProps {
  buyersCount: number;
  topBuyersByFrequency: [string, number][];
}

export function BuyersFoundCard({ buyersCount, topBuyersByFrequency }: BuyersFoundCardProps) {
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Buyers Found</CardTitle>
        <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
          <Users className="h-4 w-4 text-[#7B59FF]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-[#061237]">{buyersCount}</div>
        <div className="space-y-3">
          <p className="text-sm text-[#586079] leading-relaxed">Monto spotted unique buyer activity</p>
          <div className="space-y-1">
            {topBuyersByFrequency.slice(0, 3).map(([buyer, count], idx) => (
              <div key={buyer} className="text-sm text-[#061237] flex justify-between items-center">
                <span className={idx === 0 ? "font-semibold" : "font-normal"}>{buyer}</span>
                <span className="text-xs text-[#586079]">{count} records</span>
              </div>
            ))}
          </div>
          {/* <div className="flex justify-end pt-1">
            <span className="text-xs text-[#7B59FF] font-medium hover:underline cursor-pointer flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
