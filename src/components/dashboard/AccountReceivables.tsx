import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CreditCard, BarChart3, Table, DollarSign } from 'lucide-react';

// Mock data for Account Receivables aging
const mockARData = [
  { 
    bucket: '0-30', 
    amount: 42.5, 
    count: 145,
    percentage: 65.4,
    color: '#007737' // Good - current
  },
  { 
    bucket: '30-60', 
    amount: 18.2, 
    count: 78,
    percentage: 28.0,
    color: '#F2AE40' // Warning
  },
  { 
    bucket: '60-90', 
    amount: 3.8, 
    count: 23,
    percentage: 5.8,
    color: '#EF4444' // Danger
  },
  { 
    bucket: '90+', 
    amount: 0.5, 
    count: 4,
    percentage: 0.8,
    color: '#DC2626' // Critical
  },
];

// AR metrics
const arMetrics = {
  totalAR: 65.0, // Total A/R in millions
  currentUnpaid: 54.1, // Current A/R percentage
  zeroToThirtyUnpaid: 65.4, // 0-30 unpaid percentage
};

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ 
        background: 'white', 
        border: '1px solid #E6E7EB', 
        borderRadius: 8, 
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
        padding: 12, 
        minWidth: 140, 
        fontSize: 13, 
        lineHeight: 1.4 
      }}>
        <div style={{ fontWeight: 600, color: '#061237', marginBottom: 4, fontSize: 14 }}>{label} Days</div>
        <div style={{ color: '#007737', fontWeight: 500, fontSize: 13 }}>Amount: ${data.amount}M</div>
        <div style={{ color: '#586079', fontSize: 13 }}>Invoices: {data.count}</div>
        <div style={{ color: '#7B59FF', fontWeight: 500, marginTop: 2, fontSize: 13 }}>
          {data.percentage}% of total
        </div>
      </div>
    );
  }
  return null;
};

export function AccountReceivables() {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  return (
    <Card className="bg-white border border-[#7B59FF]/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
            <CreditCard className="h-4 w-4 text-[#7B59FF]" style={{ width: 16, height: 16 }} />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-[#061237]">Account Receivables</CardTitle>
            <p className="text-sm text-[#586079]">Aging analysis</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant={viewMode === 'chart' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('chart')}
            className={`h-8 w-8 p-0 ${viewMode === 'chart' ? 'bg-[#7B59FF] hover:bg-[#523BAA] text-white' : 'text-[#586079] hover:text-[#061237]'}`}
          >
            <BarChart3 className="h-4 w-4" style={{ width: 16, height: 16 }} />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={`h-8 w-8 p-0 ${viewMode === 'table' ? 'bg-[#7B59FF] hover:bg-[#523BAA] text-white' : 'text-[#586079] hover:text-[#061237]'}`}
          >
            <Table className="h-4 w-4" style={{ width: 16, height: 16 }} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-xl font-bold text-[#061237] mb-1">
              ${arMetrics.totalAR}M
            </div>
            <p className="text-xs text-[#586079] flex items-center gap-1">
              <DollarSign className="h-3 w-3" style={{ width: 12, height: 12 }} />
              Total A/R
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-xl font-bold text-[#061237] mb-1">
              {arMetrics.currentUnpaid}%
            </div>
            <p className="text-xs text-[#586079]">Current Unpaid</p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-xl font-bold text-[#061237] mb-1">
              {arMetrics.zeroToThirtyUnpaid}%
            </div>
            <p className="text-xs text-[#586079]">0-30 Unpaid</p>
          </div>
        </div>

        {viewMode === 'chart' ? (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockARData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <XAxis 
                  dataKey="bucket" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#586079' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#586079' }}
                  tickFormatter={(value) => `$${value}M`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar 
                  dataKey="amount" 
                  radius={[4, 4, 0, 0]}
                  fill="#7B59FF"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-2">
            {mockARData.map((item) => (
              <div key={item.bucket} className="flex justify-between items-center py-3 px-3 rounded-lg bg-white/40 hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-[#061237] w-16">{item.bucket} days</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#061237]">${item.amount}M</span>
                    <span className="text-xs text-[#586079]">({item.count} invoices)</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-[#7B59FF]">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary footer */}
        <div className="mt-4 pt-3 border-t border-[#E6E7EB]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#586079]">Total outstanding:</span>
            <div className="flex items-center gap-1 font-medium text-[#061237]">
              ${arMetrics.totalAR}M across {mockARData.reduce((acc, item) => acc + item.count, 0)} invoices
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}