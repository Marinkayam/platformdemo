
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
    return type === 'rtp' ? <AlertTriangle className="h-5 w-5" /> : <Wifi className="h-5 w-5" />;
  };

  const getColorClasses = () => {
    return count > 0 ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-gray-900">{title}</CardTitle>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-2 rounded-md ${getColorClasses()}`}>
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">{count}</div>
        {type === 'rtp' && amount !== undefined && (
          <div className="text-sm text-gray-600">
            Total: {formatCurrency(amount, 'USD')}
          </div>
        )}
        {type === 'smartconnection' && affectedInvoices !== undefined && (
          <div className="text-sm text-gray-600">
            {affectedInvoices} affected invoices
          </div>
        )}
      </CardContent>
    </Card>
  );
}
