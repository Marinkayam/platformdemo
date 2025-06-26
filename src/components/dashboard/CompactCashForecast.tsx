
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, BarChart3, Table } from 'lucide-react';

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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-purple-600" />
          <CardTitle className="text-sm font-medium text-gray-900">Cash Forecast (8 weeks)</CardTitle>
        </div>
        <div className="flex gap-1">
          <Button
            variant={viewMode === 'chart' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setViewMode('chart')}
          >
            <BarChart3 className="h-3 w-3" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setViewMode('table')}
          >
            <Table className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <div className="text-2xl font-bold text-gray-900">
            ${totalForecast.toFixed(1)}M
          </div>
          <p className="text-xs text-gray-500">Expected receipts</p>
        </div>

        {viewMode === 'chart' ? (
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCashForecast}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => [`$${value}M`, 'Amount']}
                  labelStyle={{ fontSize: '12px' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#7B59FF" 
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-1">
            {mockCashForecast.map((item) => (
              <div key={item.week} className="flex justify-between items-center py-1">
                <span className="text-xs text-gray-600">{item.week}</span>
                <span className="text-xs font-medium">${item.amount}M</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
