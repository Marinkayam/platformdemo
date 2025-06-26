
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
        return 'text-success-main bg-success-main/10 border-success-main/20';
      case 'upcoming':
        return 'text-warning-main bg-warning-main/10 border-warning-main/20';
      case 'pastdue':
        return 'text-error-main bg-error-main/10 border-error-main/20';
      case 'portal':
        return 'text-info-main bg-info-main/10 border-info-main/20';
      case 'time':
        return 'text-primary-main bg-primary-main/10 border-primary-main/20';
      default:
        return 'text-grey-600 bg-grey-100/10 border-grey-400/20';
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
    if (subtitle?.includes('-')) return 'text-error-main';
    if (subtitle?.includes('+')) return 'text-success-main';
    return 'text-grey-600';
  };

  const getBackgroundGradient = () => {
    switch (type) {
      case 'paid':
        return 'bg-gradient-to-br from-success-main/5 to-success-main/10';
      case 'upcoming':
        return 'bg-gradient-to-br from-warning-main/5 to-warning-main/10';
      case 'pastdue':
        return 'bg-gradient-to-br from-error-main/5 to-error-main/10';
      case 'portal':
        return 'bg-gradient-to-br from-info-main/5 to-info-main/10';
      case 'time':
        return 'bg-gradient-to-br from-primary-main/5 to-primary-main/10';
      default:
        return 'bg-gradient-to-br from-grey-200/50 to-grey-300/50';
    }
  };

  return (
    <Card 
      className={`relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getBackgroundGradient()} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-grey-700">{title}</CardTitle>
        {(icon || getDefaultIcon()) && (
          <div className={`p-2.5 rounded-xl border ${getColorClasses()}`}>
            {icon || getDefaultIcon()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-grey-900 mb-2">{value}</div>
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
