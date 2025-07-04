
import React, { useState, useEffect } from 'react';
import { Insight } from '@/types/insights';
import { PaymentHabitBadge } from './PaymentHabitBadge';
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Zap } from 'lucide-react';

interface InsightsTableProps {
  insights: Insight[];
}

export function InsightsTable({ insights }: InsightsTableProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [scannedCount, setScannedCount] = useState(0);
  const [visibleInsights, setVisibleInsights] = useState<Insight[]>([]);

  useEffect(() => {
    // Fast AI scanning simulation
    const scanningInterval = setInterval(() => {
      setScannedCount(prev => {
        const newCount = prev + 1;
        if (newCount <= insights.length) {
          setVisibleInsights(insights.slice(0, newCount));
        }
        return newCount;
      });
    }, 200); // Very fast - 200ms per insight

    const completionTimer = setTimeout(() => {
      setIsScanning(false);
      clearInterval(scanningInterval);
      setVisibleInsights(insights);
    }, insights.length * 200 + 800); // Extra 800ms buffer

    return () => {
      clearInterval(scanningInterval);
      clearTimeout(completionTimer);
    };
  }, [insights]);

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
    <div className="space-y-4">
      {/* AI Scanning Status */}
      {isScanning && (
        <div className="rounded-xl border bg-gradient-to-r from-primary/5 to-primary/10 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="h-5 w-5 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-3 w-3 text-primary animate-bounce" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-primary">AI Scanning in Progress</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </div>
              <div className="text-xs text-gray-600">
                Analyzing payment patterns and relationship insights... {scannedCount}/{insights.length} processed
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{Math.round((scannedCount / insights.length) * 100)}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${(scannedCount / insights.length) * 100}%` }}
            />
          </div>
        </div>
      )}

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
        {visibleInsights.map((insight, index) => (
          <div 
            key={insight.id}
            className={`grid grid-cols-6 gap-4 px-6 py-5 hover:bg-gray-50 transition-all min-h-[80px] ${
              index >= scannedCount - 1 && isScanning ? 'animate-fade-in bg-primary/5' : ''
            }`}
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
          <span className="text-gray-600">
            Total insights: {isScanning ? `${scannedCount}/${insights.length}` : insights.length}
            {isScanning && <span className="ml-2 text-primary animate-pulse">• Scanning...</span>}
          </span>
          {!isScanning && (
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Analysis Complete
            </Badge>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
