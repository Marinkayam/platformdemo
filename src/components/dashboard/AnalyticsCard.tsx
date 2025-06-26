
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
        return 'text-green-600 bg-green-50';
      case 'upcoming':
        return 'text-yellow-600 bg-yellow-50';
      case 'pastdue':
        return 'text-red-600 bg-red-50';
      case 'portal':
        return 'text-blue-600 bg-blue-50';
      case 'time':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
    if (subtitle?.includes('-')) return 'text-red-500';
    if (subtitle?.includes('+')) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <Card 
      className={`hover-scale animate-fade-in ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {(icon || getDefaultIcon()) && (
          <div className={`p-2 rounded-md ${getColorClasses()}`}>
            {icon || getDefaultIcon()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        {subtitle && (
          <p className={`text-xs ${getTextColor()} flex items-center gap-1`}>
            {subtitle.includes('+') && <TrendingUp className="h-3 w-3" />}
            {subtitle.includes('-') && <TrendingDown className="h-3 w-3" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
