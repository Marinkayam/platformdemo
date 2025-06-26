
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockInsights } from '@/data/insights';

export function DashboardInsights() {
  const navigate = useNavigate();

  const handleInsightsClick = () => {
    navigate('/payments-relationships?tab=insights');
  };

  // Calculate summary from insights data
  const excellentPayments = mockInsights.filter(i => i.paymentHabit.score === 'Excellent').length;
  const avgDSO = Math.round(mockInsights.reduce((acc, i) => acc + i.paymentHabit.dso, 0) / mockInsights.length);
  const totalRelationships = mockInsights.length;

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-primary-main/5 to-primary-main/10 border border-primary-main/20"
      onClick={handleInsightsClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-main/10 border border-primary-main/20">
            <TrendingUp className="h-5 w-5 text-primary-main" />
          </div>
          <CardTitle className="text-lg font-semibold text-grey-900">Payment Insights</CardTitle>
        </div>
        <ArrowRight className="h-4 w-4 text-grey-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-white/60 border border-grey-200">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-grey-500" />
              <span className="text-xs font-medium text-grey-600 uppercase tracking-wide">Total</span>
            </div>
            <span className="text-2xl font-bold text-grey-900">{totalRelationships}</span>
            <p className="text-xs text-grey-600">Relationships</p>
          </div>
          
          <div className="p-3 rounded-lg bg-white/60 border border-grey-200">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-grey-500" />
              <span className="text-xs font-medium text-grey-600 uppercase tracking-wide">Avg DSO</span>
            </div>
            <span className="text-2xl font-bold text-grey-900">{avgDSO}</span>
            <p className="text-xs text-grey-600">Days</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/60 border border-grey-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-grey-700">Excellent Payers</span>
            <Badge className="bg-success-main/10 text-success-main border-success-main/20 hover:bg-success-main/20">
              {excellentPayments} customers
            </Badge>
          </div>
          <div className="w-full bg-grey-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-success-main to-success-main/80 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(excellentPayments / totalRelationships) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-grey-200">
          <p className="text-sm text-primary-main hover:text-primary-dark transition-colors flex items-center gap-1">
            View detailed insights
            <ArrowRight className="h-3 w-3" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
