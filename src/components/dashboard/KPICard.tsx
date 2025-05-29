
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface KPICardProps {
  title: string;
  value: number;
  subtitle?: string;
  type: 'rejection' | 'zerotouch';
  showProgress?: boolean;
}

export function KPICard({ title, value, subtitle, type, showProgress }: KPICardProps) {
  const getColorClass = () => {
    if (type === 'rejection') {
      return value > 5 ? 'text-red-600' : 'text-orange-600';
    }
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (type === 'rejection') {
      return value > 5 ? 'bg-red-500' : 'bg-orange-500';
    }
    return 'bg-green-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className={`text-3xl font-bold ${getColorClass()}`}>
          {value}%
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        {showProgress && (
          <div className="space-y-2">
            <Progress 
              value={value} 
              className="h-2" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
