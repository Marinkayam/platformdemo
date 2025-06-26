
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Wifi } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ExceptionCardProps {
  title: string;
  subtitle: string;
  count: number;
  amount?: number;
  type: 'rtp' | 'smartconnection';
  affectedInvoices?: number;
}

export function ExceptionCard({ title, subtitle, count, amount, type, affectedInvoices }: ExceptionCardProps) {
  const getIcon = () => {
    return type === 'rtp' ? <AlertTriangle className="h-6 w-6" /> : <Wifi className="h-6 w-6" />;
  };

  const getColorClasses = () => {
    if (count > 0) {
      return type === 'rtp' 
        ? 'text-error-main bg-gradient-to-br from-error-main/10 to-error-main/20 border-error-main/30'
        : 'text-warning-main bg-gradient-to-br from-warning-main/10 to-warning-main/20 border-warning-main/30';
    }
    return 'text-success-main bg-gradient-to-br from-success-main/10 to-success-main/20 border-success-main/30';
  };

  const getCardBackground = () => {
    if (count > 0) {
      return type === 'rtp' 
        ? 'bg-gradient-to-br from-error-main/5 to-error-main/10'
        : 'bg-gradient-to-br from-warning-main/5 to-warning-main/10';
    }
    return 'bg-gradient-to-br from-success-main/5 to-success-main/10';
  };

  return (
    <Card className={`relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getCardBackground()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold text-grey-900 mb-1">{title}</CardTitle>
          <p className="text-sm text-grey-600">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl border ${getColorClasses()}`}>
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-grey-900">{count}</span>
          <span className="text-sm text-grey-600">
            {type === 'rtp' ? 'exceptions' : 'connections'}
          </span>
        </div>
        
        {type === 'rtp' && amount !== undefined && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-grey-200">
            <span className="text-sm font-medium text-grey-700">Total Amount</span>
            <span className="text-lg font-bold text-grey-900">
              {formatCurrency(amount, 'USD')}
            </span>
          </div>
        )}
        
        {type === 'smartconnection' && affectedInvoices !== undefined && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-grey-200">
            <span className="text-sm font-medium text-grey-700">Affected Invoices</span>
            <span className="text-lg font-bold text-grey-900">{affectedInvoices}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
