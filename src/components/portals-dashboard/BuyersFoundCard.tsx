import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Building2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface BuyersFoundCardProps {
  buyersCount: number;
  topBuyersByFrequency: [string, number][];
}

export function BuyersFoundCard({ buyersCount, topBuyersByFrequency }: BuyersFoundCardProps) {
  // Calculate total records for percentage
  const totalRecords = topBuyersByFrequency.reduce((sum, [_, count]) => sum + count, 0);
  
  // Mock additional data for interest
  const newBuyers = 8;
  const growthRate = 12;
  
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7B59FF]/5 to-transparent rounded-full -mr-16 -mt-16" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Buyers Found</CardTitle>
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#7B59FF]/10 to-[#7B59FF]/20 border border-[#7B59FF]/20">
          <Building2 className="h-4 w-4 text-[#7B59FF]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-[#061237]">{buyersCount}</div>
            <p className="text-xs text-[#586079] mt-1">Unique buyers identified</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className="text-xs text-[#586079]">{newBuyers} new this week</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#586079] font-medium">Top Active Buyers</p>
            <Sparkles className="h-3 w-3 text-[#7B59FF]" />
          </div>
          
          <div className="space-y-2">
            {topBuyersByFrequency.slice(0, 3).map(([buyer, count], idx) => {
              const percentage = Math.round((count / totalRecords) * 100);
              
              return (
                <div key={buyer} className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2">
                    {idx === 0 && <span className="text-xs">👑</span>}
                    <span className={`text-sm ${idx === 0 ? "font-semibold text-[#061237]" : "text-[#586079]"}`}>
                      {buyer}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-[#7B59FF]">{percentage}%</span>
                    <span className="text-xs text-[#586079] ml-1">({count} records)</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white mt-3 group" asChild>
            <Link to="/smart-connections" className="flex items-center justify-center gap-2">
              <span>View All Smart Connections</span>
              <TrendingUp className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
