import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/portalsDashboardUtils";

interface OpenInvoicesCardProps {
  openInvoicesCount: number;
  openInvoicesTotal: number;
  openInvoicesDueSoon: any[];
}

export function OpenInvoicesCard({ openInvoicesCount, openInvoicesTotal, openInvoicesDueSoon }: OpenInvoicesCardProps) {
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Open Invoices</CardTitle>
        <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
          <FileText className="h-4 w-4 text-[#7B59FF]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold text-[#061237]">{`${formatCurrency(openInvoicesTotal)} (${openInvoicesCount} invoices)`}</div>
        <div className="space-y-2">
          {openInvoicesDueSoon.length > 0 && (
            <p className="text-xs text-[#F2AE40] leading-relaxed">({openInvoicesDueSoon.length} due soon)</p>
          )}
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
