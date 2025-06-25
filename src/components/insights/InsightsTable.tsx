
import React from 'react';
import { Insight } from '@/types/insights';
import { PaymentHabitBadge } from './PaymentHabitBadge';

interface InsightsTableProps {
  insights: Insight[];
}

export function InsightsTable({ insights }: InsightsTableProps) {
  if (insights.length === 0) {
    return (
      <div className="rounded-xl border bg-white">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-gray-400 text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights available</h3>
          <p className="text-gray-500 mb-6">Check back later for insights data.</p>
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
      <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-[#F6F7F9] border-b border-gray-200">
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
            className="grid grid-cols-6 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors min-h-[80px]"
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
            <div className="flex flex-col justify-center gap-1">
              <span className="text-sm font-medium text-gray-900">
                {insight.openPOs}
              </span>
              <span className="text-xs text-gray-500">
                ${(insight.openPOs * 23750).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <span className="text-sm font-medium text-gray-900">
                {insight.approvedInvoices}
              </span>
              <span className="text-xs text-gray-500">
                ${(insight.approvedInvoices * 6150).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <span className="text-sm font-medium text-gray-900">
                {insight.invoicesInRisk}
              </span>
              <span className="text-xs text-gray-500">
                ${(insight.invoicesInRisk * 4200).toLocaleString()}
              </span>
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
