import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, Area, Legend } from 'recharts';
import { Calendar, BarChart3, Table, TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';

// Enhanced mock data for cash forecast with realistic patterns
const mockCashForecast = [
  { week: 'W1', amount: 3.2, expected: 3.5, variance: -0.3, category: 'Incoming' },
  { week: 'W2', amount: 2.8, expected: 2.9, variance: -0.1, category: 'Incoming' },
  { week: 'W3', amount: 4.1, expected: 3.8, variance: 0.3, category: 'Incoming' },
  { week: 'W4', amount: 3.9, expected: 4.2, variance: -0.3, category: 'Incoming' },
  { week: 'W5', amount: 5.2, expected: 4.8, variance: 0.4, category: 'Incoming' },
  { week: 'W6', amount: 4.7, expected: 4.5, variance: 0.2, category: 'Incoming' },
  { week: 'W7', amount: 3.8, expected: 3.9, variance: -0.1, category: 'Incoming' },
  { week: 'W8', amount: 4.5, expected: 4.3, variance: 0.2, category: 'Incoming' },
];

// Additional cash flow metrics
const cashFlowMetrics = {
  totalExpected: 32.0,
  totalActual: 31.2,
  variance: -0.8,
  weeklyAverage: 3.9,
  highestWeek: { week: 'W5', amount: 5.2 },
  lowestWeek: { week: 'W2', amount: 2.8 },
  onTrackPercentage: 87.5, // 7 out of 8 weeks within variance
  riskWeeks: 2, // weeks with significant variance
};

// Custom tooltip for more data
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const actual = payload.find((p: any) => p.dataKey === 'amount')?.value;
    const expected = payload.find((p: any) => p.dataKey === 'expected')?.value;
    const variance = actual - expected;
    let varianceColor = '#586079';
    if (variance >= 0.3) varianceColor = '#007737';
    if (variance <= -0.3) varianceColor = '#EF4444';
    return (
      <div style={{ background: 'white', border: '1px solid #E6E7EB', borderRadius: 8, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: 10, minWidth: 120, fontSize: 13, lineHeight: 1.3 }}>
        <div style={{ fontWeight: 600, color: '#7B59FF', marginBottom: 2, fontSize: 13 }}>{label}</div>
        <div style={{ color: '#7B59FF', fontWeight: 500, fontSize: 13 }}>Monto Real: ${actual?.toFixed(1)}M</div>
        <div style={{ color: '#586079', fontSize: 13 }}>Monto Esperado: ${expected?.toFixed(1)}M</div>
        <div style={{ color: varianceColor, fontWeight: 500, marginTop: 2, fontSize: 13 }}>
          Diferencia: {variance > 0 ? '+' : ''}{variance.toFixed(1)}M
        </div>
        <div style={{ color: '#A0A3B1', fontSize: 11, marginTop: 4 }}>Diferencia = Monto Real - Monto Esperado</div>
      </div>
    );
  }
  return null;
};

export function CompactCashForecast() {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const getVarianceColor = (variance: number) => {
    if (variance >= 0.3) return 'text-[#007737]'; // Good variance
    if (variance <= -0.3) return 'text-[#EF4444]'; // Bad variance
    return 'text-[#586079]'; // Neutral
  };

  const getVarianceIcon = (variance: number) => {
    if (variance >= 0.3) return <TrendingUp className="h-4 w-4" style={{ width: 16, height: 16 }} />;
    if (variance <= -0.3) return <TrendingDown className="h-4 w-4" style={{ width: 16, height: 16 }} />;
    return null;
  };

  return (
    <Card className="bg-white border border-[#7B59FF]/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
            <Calendar className="h-4 w-4 text-[#7B59FF]" style={{ width: 16, height: 16 }} />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-[#061237]">Cash Forecast</CardTitle>
            <p className="text-sm text-[#586079]">8-week rolling forecast</p>
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-2xl font-bold text-[#061237] mb-1">
              ${cashFlowMetrics.totalExpected}M
            </div>
            <p className="text-xs text-[#586079] flex items-center gap-1">
              <DollarSign className="h-3 w-3" style={{ width: 16, height: 16 }} />
              Total expected
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-2xl font-bold text-[#061237] mb-1">
              ${cashFlowMetrics.weeklyAverage}M
            </div>
            <p className="text-xs text-[#586079]">Weekly average</p>
          </div>
        </div>

        {/* Performance indicators */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-2 rounded-lg bg-[#007737]/5 border border-[#007737]/20">
            <div className="text-lg font-bold text-[#007737]">{cashFlowMetrics.onTrackPercentage}%</div>
            <p className="text-xs text-[#586079]">On track</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-[#F2AE40]/5 border border-[#F2AE40]/20">
            <div className="text-lg font-bold text-[#F2AE40]">{cashFlowMetrics.highestWeek.amount}M</div>
            <p className="text-xs text-[#586079]">Peak week</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-[#EF4444]/5 border border-[#EF4444]/20">
            <div className="text-lg font-bold text-[#EF4444]">{cashFlowMetrics.riskWeeks}</div>
            <p className="text-xs text-[#586079]">Risk weeks</p>
          </div>
        </div>

        {viewMode === 'chart' ? (
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCashForecast} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#586079' }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Area 
                  type="monotone" 
                  dataKey="expected" 
                  stroke="#7B59FF" 
                  fill="#EDE9FE" 
                  fillOpacity={0.4}
                  name="Expected"
                  dot={{ fill: '#7B59FF', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expected" 
                  stroke="#7B59FF" 
                  strokeWidth={2}
                  dot={{ fill: '#7B59FF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Expected"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-2">
            {mockCashForecast.map((item) => (
              <div key={item.week} className="flex justify-between items-center py-2 px-3 rounded-lg bg-white/40 hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#586079] w-8">{item.week}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#061237]">${item.amount}M</span>
                    <span className="text-xs text-[#586079]">/ ${item.expected}M</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${getVarianceColor(item.variance)}`}>
                  {getVarianceIcon(item.variance)}
                  {item.variance > 0 ? '+' : ''}{item.variance.toFixed(1)}M
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary footer */}
        <div className="mt-4 pt-3 border-t border-[#E6E7EB]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#586079]">Overall variance:</span>
            <div className={`flex items-center gap-1 font-medium ${cashFlowMetrics.variance >= 0 ? 'text-[#007737]' : 'text-[#EF4444]'}`}>
              {cashFlowMetrics.variance > 0 ? '+' : ''}{cashFlowMetrics.variance.toFixed(1)}M
              {cashFlowMetrics.variance < 0 && <AlertTriangle className="h-4 w-4" style={{ width: 16, height: 16 }} />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
