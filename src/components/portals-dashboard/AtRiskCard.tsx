import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/portalsDashboardUtils";

interface AtRiskCardProps {
  atRiskInvoicesCount: number;
  atRiskInvoicesTotal: number;
}

export function AtRiskCard({ atRiskInvoicesCount, atRiskInvoicesTotal }: AtRiskCardProps) {
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#F2AE40]/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#F2AE40]">At Risk</CardTitle>
        <div className="p-2.5 rounded-xl bg-[#F2AE40]/10 border border-[#F2AE40]/20">
          <AlertTriangle className="h-4 w-4 text-[#F2AE40]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold text-[#F2AE40]">{`${formatCurrency(atRiskInvoicesTotal)} (${atRiskInvoicesCount} invoices)`}</div>
        <div className="space-y-2">
          <p className="text-sm text-[#061237] leading-relaxed">Monto flagged risky invoices needing attention</p>
          <div className="flex justify-end">
            <span className="text-xs text-[#7B59FF] font-medium hover:underline cursor-pointer flex items-center gap-1">
              View all invoices <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
