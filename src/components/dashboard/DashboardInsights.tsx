import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, ArrowRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockInsights } from '@/data/insights';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export function DashboardInsights() {
  const navigate = useNavigate();

  const handleInsightsClick = () => {
    navigate('/payments-relationships?tab=insights');
  };

  // Calculate summary from insights data
  const excellentPayments = mockInsights.filter(i => i.paymentHabit.score === 'Excellent').length;
  const avgDSO = Math.round(mockInsights.reduce((acc, i) => acc + i.paymentHabit.dso, 0) / mockInsights.length);
  const totalRelationships = mockInsights.length;

  // Get top 3 excellent payers
  const excellentPayers = mockInsights
    .filter(i => i.paymentHabit.score === 'Excellent')
    .sort((a, b) => a.paymentHabit.dso - b.paymentHabit.dso) // Sort by lowest DSO first
    .slice(0, 3);

  // Mock data for mini area chart
  const miniChartData = [
    { week: 'W1', value: 12 },
    { week: 'W2', value: 15 },
    { week: 'W3', value: 14 },
    { week: 'W4', value: 18 },
    { week: 'W5', value: 17 },
    { week: 'W6', value: 20 },
    { week: 'W7', value: 19 },
    { week: 'W8', value: 22 },
  ];

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-[#7B59FF]/20"
      onClick={handleInsightsClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
            <TrendingUp className="h-4 w-4 text-[#7B59FF]" style={{ width: 16, height: 16 }} />
          </div>
          <CardTitle className="text-lg font-semibold text-[#061237]">Payment Insights</CardTitle>
        </div>
        <ArrowRight className="h-4 w-4 text-[#586079]" style={{ width: 16, height: 16 }} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-[#586079]" style={{ width: 16, height: 16 }} />
              <span className="text-xs font-medium text-[#586079] uppercase tracking-wide">Total</span>
            </div>
            <span className="text-2xl font-bold text-[#061237]">{totalRelationships}</span>
            <p className="text-xs text-[#586079]">Relationships</p>
          </div>
          
          <div className="p-3 rounded-lg bg-white/60 border border-[#E6E7EB]">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-[#586079]" style={{ width: 16, height: 16 }} />
              <span className="text-xs font-medium text-[#586079] uppercase tracking-wide">Avg DSO</span>
            </div>
            <span className="text-2xl font-bold text-[#061237]">{avgDSO}</span>
            <p className="text-xs text-[#586079]">Days</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/60 border border-[#E6E7EB]">
          <div className="mb-3">
            <span className="text-sm font-medium text-[#586079]">Top Excellent Payers</span>
          </div>
          <div className="space-y-2">
            {excellentPayers.map((payer, index) => (
              <div key={payer.id} className="flex items-center gap-3 py-1">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#007737]/10 flex-shrink-0">
                  <Award className="h-4 w-4 text-[#007737]" style={{ width: 16, height: 16 }} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-[#061237] truncate">{payer.buyer}</span>
                  <span className="text-xs text-[#586079] truncate">{payer.supplier}</span>
                </div>
                <div className="ml-auto text-left">
                  <span className="text-sm font-normal text-[#007737]">{payer.paymentHabit.dso} days</span>
                  <span className="block text-xs text-[#586079]">DSO</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2 border-t border-[#E6E7EB]">
          <p className="text-sm text-[#7B59FF] hover:text-[#523BAA] transition-colors flex items-center gap-1">
            View detailed insights
            <ArrowRight className="h-4 w-4" style={{ width: 16, height: 16 }} />
          </p>
          <div className="mt-4 h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miniChartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                <Area type="monotone" dataKey="value" stroke="#7B59FF" fill="#EDE9FE" fillOpacity={0.7} strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
