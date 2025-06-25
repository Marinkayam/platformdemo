
import React from 'react';
import { Insight } from '@/types/insights';
import { PaymentHabitBadge } from './PaymentHabitBadge';
import { Badge } from '@/components/ui/badge';

interface InsightsTableProps {
  insights: Insight[];
}

export function InsightsTable({ insights }: InsightsTableProps) {
  const getRiskBadge = (count: number) => {
    if (count === 0) {
      return <Badge className="bg-[#E6F4EA] text-[#007737] hover:bg-[#E6F4EA]">None</Badge>;
    } else if (count <= 5) {
      return <Badge className="bg-[#FFF8E1] text-[#F2AE40] hover:bg-[#FFF8E1]">{count}</Badge>;
    } else {
      return <Badge className="bg-[#FFEBEE] text-[#D32F2F] hover:bg-[#FFEBEE]">{count}</Badge>;
    }
  };

  if (insights.length === 0) {
    return (
      <div className="rounded-xl border bg-white">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-gray-400 text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights match this filter</h3>
          <p className="text-gray-500 mb-6">Try changing your criteria.</p>
        </div>
        <div className="border-t border-gray-200 bg-[#F6F7F9] px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total insights: 0</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-grey-50 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-700">Supplier</div>
        <div className="text-sm font-semibold text-gray-700">Buyer</div>
        <div className="text-sm font-semibold text-gray-700">Open POs</div>
        <div className="text-sm font-semibold text-gray-700">Approved Invoices</div>
        <div className="text-sm font-semibold text-gray-700">Invoices in Risk</div>
        <div className="text-sm font-semibold text-gray-700">Payment Habit</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900 truncate">
                {insight.supplier}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 truncate">
                {insight.buyer}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">
                {insight.openPOs}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">
                {insight.approvedInvoices}
              </span>
            </div>
            <div className="flex items-center">
              {getRiskBadge(insight.invoicesInRisk)}
            </div>
            <div className="flex items-center">
              <PaymentHabitBadge paymentHabit={insight.paymentHabit} />
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="border-t border-gray-200 bg-[#F6F7F9] px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total insights: {insights.length}</span>
        </div>
      </div>
    </div>
  );
}
