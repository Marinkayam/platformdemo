import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for transactions by month (last year - 2023)
const mockTransactionsData = [
  { month: 'Jan 2023', amount: 2.8, recordCount: 142 },
  { month: 'Feb 2023', amount: 3.1, recordCount: 156 },
  { month: 'Mar 2023', amount: 2.9, recordCount: 148 },
  { month: 'Apr 2023', amount: 3.4, recordCount: 171 },
  { month: 'May 2023', amount: 3.2, recordCount: 163 },
  { month: 'Jun 2023', amount: 3.8, recordCount: 189 },
  { month: 'Jul 2023', amount: 3.6, recordCount: 182 },
  { month: 'Aug 2023', amount: 3.9, recordCount: 195 },
  { month: 'Sep 2023', amount: 3.7, recordCount: 187 },
  { month: 'Oct 2023', amount: 4.1, recordCount: 208 },
  { month: 'Nov 2023', amount: 3.8, recordCount: 192 },
  { month: 'Dec 2023', amount: 4.3, recordCount: 218 },
];

// Calculate summary metrics
const totalTransactions = mockTransactionsData.reduce((acc, item) => acc + item.amount, 0);
const totalRecords = mockTransactionsData.reduce((acc, item) => acc + item.recordCount, 0);
const avgMonthlyAmount = totalTransactions / mockTransactionsData.length;
const avgMonthlyRecords = Math.round(totalRecords / mockTransactionsData.length);

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const amount = payload.find((p: any) => p.dataKey === 'amount')?.value;
    const records = payload.find((p: any) => p.dataKey === 'recordCount')?.value;
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
        <div style={{ fontWeight: 600, color: '#061237', marginBottom: 4, fontSize: 14 }}>{label}</div>
        <div style={{ color: '#7B59FF', fontWeight: 500, fontSize: 13 }}>Amount: ${amount}M</div>
        <div style={{ color: '#00BCD4', fontWeight: 500, fontSize: 13 }}>Records: {records}</div>
      </div>
    );
  }
  return null;
};

export function TransactionsChart() {
  const navigate = useNavigate();

  const handleTransactionsClick = () => {
    navigate('/payments-relationships?tab=transactions');
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-[#7B59FF]/20"
      onClick={handleTransactionsClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
            <TrendingUp className="h-4 w-4 text-[#7B59FF]" style={{ width: 16, height: 16 }} />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-[#061237]">Transactions</CardTitle>
            <p className="text-sm text-[#586079]">Monthly volume analysis</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-[#586079]" style={{ width: 16, height: 16 }} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-2xl font-bold text-[#061237] mb-1">
              ${totalTransactions.toFixed(1)}M
            </div>
            <p className="text-xs text-[#586079]">Total Volume</p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="text-2xl font-bold text-[#061237] mb-1">
              {totalRecords}
            </div>
            <p className="text-xs text-[#586079]">Total Records</p>
          </div>
        </div>

        {/* Performance indicators */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-lg bg-[#7B59FF]/5 border border-[#7B59FF]/20">
            <div className="text-lg font-bold text-[#7B59FF]">${avgMonthlyAmount.toFixed(1)}M</div>
            <p className="text-xs text-[#586079]">Avg Monthly</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-[#00BCD4]/5 border border-[#00BCD4]/20">
            <div className="text-lg font-bold text-[#00BCD4]">{avgMonthlyRecords}</div>
            <p className="text-xs text-[#586079]">Avg Records</p>
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockTransactionsData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#586079' }}
              />
              <YAxis 
                yAxisId="amount"
                orientation="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#7B59FF' }}
                tickFormatter={(value) => `$${value}M`}
              />
              <YAxis 
                yAxisId="records"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#00BCD4' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar 
                yAxisId="amount"
                dataKey="amount" 
                fill="#7B59FF" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
              <Bar 
                yAxisId="records"
                dataKey="recordCount" 
                fill="#00BCD4" 
                radius={[2, 2, 0, 0]}
                opacity={0.6}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="pt-2 border-t border-[#E6E7EB]">
          <p className="text-sm text-[#7B59FF] hover:text-[#523BAA] transition-colors flex items-center gap-1">
            View detailed transactions
            <ArrowRight className="h-4 w-4" style={{ width: 16, height: 16 }} />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}