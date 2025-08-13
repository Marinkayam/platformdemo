import React from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, Clock, FileText, ShoppingCart, Percent, DollarSign } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subText?: string;
  color: string;
  isScanning?: boolean;
  isComplete?: boolean;
}

function MetricCard({ icon, label, value, subText, color, isScanning, isComplete }: MetricCardProps) {
  return (
    <Card className="border-[#E6E7EB] bg-white px-5 py-3 rounded-lg shadow-none">
      <div className="flex flex-col space-y-2">
        <div className={`text-${color} ${isScanning ? 'animate-pulse' : ''} ${isComplete ? 'animate-bounce-once' : ''}`}>
          {icon}
        </div>
        <div className="text-xs text-[#586079] font-medium uppercase tracking-wide">
          {label}
        </div>
        <div className="text-2xl font-bold text-[#061237]">
          {value}
        </div>
        {subText && (
          <div className="text-xs text-[#586079]">
            {subText}
          </div>
        )}
      </div>
    </Card>
  );
}

interface SmartConnectionsInsightsProps {
  isScanning?: boolean;
  isComplete?: boolean;
}

export function SmartConnectionsInsights({ isScanning = false, isComplete = false }: SmartConnectionsInsightsProps) {
  const metrics = [
    {
      icon: <Calendar className="h-3 w-3" />,
      label: "TDSO",
      value: "28",
      subText: "Days",
      color: "[#7B59FF]"
    },
    {
      icon: <Clock className="h-3 w-3" />,
      label: "Avg DSO",
      value: "32",
      subText: "Days",
      color: "[#7B59FF]"
    },
    {
      icon: <FileText className="h-3 w-3" />,
      label: "Receivables",
      value: "$2.4M",
      subText: "(142 invoices)",
      color: "[#22C55E]"
    },
    {
      icon: <ShoppingCart className="h-3 w-3" />,
      label: "Open POs",
      value: "$1.8M",
      subText: "(68 orders)",
      color: "[#F2AE40]"
    },
    {
      icon: <Percent className="h-3 w-3" />,
      label: "Rejection Rate",
      value: "2.1%",
      subText: "(8 invoices)",
      color: "[#EF4444]"
    },
    {
      icon: <DollarSign className="h-3 w-3" />,
      label: "Last Yr Revenue",
      value: "$12.5M",
      color: "[#7B59FF]"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm text-[#586079] font-medium tracking-tight mb-2 px-2">
        Insights
      </h3>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-6 gap-4 min-w-[900px]">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              subText={metric.subText}
              color={metric.color}
              isScanning={isScanning}
              isComplete={isComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}