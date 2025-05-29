
import { Card, CardContent } from "@/components/ui/card";

interface ConversionCardProps {
  title: string;
  value: string;
  percentage: number;
  color: 'green' | 'blue';
}

export function ConversionCard({ title, value, percentage, color }: ConversionCardProps) {
  const getColorClasses = () => {
    return color === 'green' 
      ? 'from-green-400 to-green-600 text-white' 
      : 'from-blue-400 to-blue-600 text-white';
  };

  const getCircleColor = () => {
    return color === 'green' ? '#22c55e' : '#3b82f6';
  };

  return (
    <Card className={`bg-gradient-to-r ${getColorClasses()} animate-scale-in`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm opacity-90">{title}</div>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white opacity-30"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-white"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
                strokeLinecap="round"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{
                  strokeDasharray: `${percentage}, 100`,
                  animation: 'progress 2s ease-in-out forwards'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">{percentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
