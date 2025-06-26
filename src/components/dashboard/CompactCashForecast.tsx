
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, BarChart3, Table, TrendingUp } from 'lucide-react';

// Mock data for cash forecast
const mockCashForecast = [
  { week: 'W1', amount: 2.5 },
  { week: 'W2', amount: 1.8 },
  { week: 'W3', amount: 3.2 },
  { week: 'W4', amount: 2.1 },
  { week: 'W5', amount: 4.1 },
  { week: 'W6', amount: 1.9 },
  { week: 'W7', amount: 2.8 },
  { week: 'W8', amount: 3.5 },
];

export function CompactCashForecast() {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const totalForecast = mockCashForecast.reduce((acc, item) => acc + item.amount, 0);
  const avgWeekly = totalForecast / mockCashForecast.length;

  return (
    <Card className="bg-white border border-[#7B59FF]/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
            <Calendar className="h-5 w-5 text-[#7B59FF]" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-[#061237]">Cash Forecast</CardTitle>
            <p className="text-sm text-[#586079]">Next 8 weeks</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant={viewMode === 'chart' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('chart')}
            className={`h-8 w-8 p-0 ${viewMode === 'chart' ? 'bg-[#7B59FF] hover:bg-[#523BAA] text-white' : 'text-[#586079] hover:text-[#061237]'}`}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={`h-8 w-8 p-0 ${viewMode === 'table' ? 'bg-[#7B59FF] hover:bg-[#523BAA] text-white' : 'text-[#586079] hover:text-[#061237]'}`}
          >
            <Table className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-2xl font-bold text-[#061237] mb-1">
              ${totalForecast.toFixed(1)}M
            </div>
            <p className="text-xs text-[#586079] flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Total expected
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-2xl font-bold text-[#061237] mb-1">
              ${avgWeekly.toFixed(1)}M
            </div>
            <p className="text-xs text-[#586079]">Weekly average</p>
          </div>
        </div>

        {viewMode === 'chart' ? (
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCashForecast} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#586079' }}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => [`$${value}M`, 'Amount']}
                  labelStyle={{ fontSize: '12px', color: '#586079' }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E6E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7B59FF" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#7B59FF" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-2">
            {mockCashForecast.map((item) => (
              <div key={item.week} className="flex justify-between items-center py-2 px-3 rounded-lg bg-white/40 hover:bg-white/60 transition-colors">
                <span className="text-sm font-medium text-[#586079]">{item.week}</span>
                <span className="text-sm font-bold text-[#061237]">${item.amount}M</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
