
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock } from 'lucide-react';
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
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleInsightsClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-900">Customer Payment Insights</CardTitle>
        <TrendingUp className="h-4 w-4 text-blue-600" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Total Relationships</span>
          </div>
          <span className="font-semibold">{totalRelationships}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Avg DSO</span>
          </div>
          <span className="font-semibold">{avgDSO} days</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Excellent Payers</span>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {excellentPayments} customers
          </Badge>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-blue-600 hover:text-blue-700">
            View detailed payment insights →
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
