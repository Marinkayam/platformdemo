
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  type: 'paid' | 'upcoming' | 'pastdue' | 'portal' | 'time';
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function AnalyticsCard({ title, value, subtitle, type, icon, onClick }: AnalyticsCardProps) {
  const getColorClasses = () => {
    switch (type) {
      case 'paid':
        return 'text-[#007737] bg-[#007737]/10 border-[#007737]/20';
      case 'upcoming':
        return 'text-[#F2AE40] bg-[#F2AE40]/10 border-[#F2AE40]/20';
      case 'pastdue':
        return 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20';
      case 'portal':
        return 'text-[#7B59FF] bg-[#EFEBFF] border-[#7B59FF]/20';
      case 'time':
        return 'text-[#7B59FF] bg-[#EFEBFF] border-[#7B59FF]/20';
      default:
        return 'text-[#586079] bg-[#E6E7EB]/10 border-[#E6E7EB]/20';
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'paid':
        return <TrendingUp className="h-5 w-5" />;
      case 'pastdue':
        return <TrendingDown className="h-5 w-5" />;
      case 'time':
        return <Clock className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getTextColor = () => {
    if (subtitle?.includes('-')) return 'text-[#EF4444]';
    if (subtitle?.includes('+')) return 'text-[#007737]';
    return 'text-[#586079]';
  };

  const getBackgroundGradient = () => {
    switch (type) {
      case 'paid':
        return 'bg-gradient-to-br from-[#007737]/5 to-[#007737]/10';
      case 'upcoming':
        return 'bg-gradient-to-br from-[#F2AE40]/5 to-[#F2AE40]/10';
      case 'pastdue':
        return 'bg-gradient-to-br from-[#EF4444]/5 to-[#EF4444]/10';
      case 'portal':
        return 'bg-gradient-to-br from-[#EFEBFF] to-[#BEADFF]/20';
      case 'time':
        return 'bg-gradient-to-br from-[#EFEBFF] to-[#BEADFF]/20';
      default:
        return 'bg-gradient-to-br from-[#E6E7EB]/50 to-[#F4F6F8]/50';
    }
  };

  return (
    <Card 
      className={`relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getBackgroundGradient()} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-[#586079]">{title}</CardTitle>
        {(icon || getDefaultIcon()) && (
          <div className={`p-2.5 rounded-xl border ${getColorClasses()}`}>
            {icon || getDefaultIcon()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-[#061237] mb-2">{value}</div>
        {subtitle && (
          <p className={`text-sm ${getTextColor()} flex items-center gap-1`}>
            {subtitle.includes('+') && <TrendingUp className="h-4 w-4" />}
            {subtitle.includes('-') && <TrendingDown className="h-4 w-4" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
