
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Link, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ExceptionCardProps {
  title: string;
  subtitle: string;
  count: number;
  amount?: number;
  type: 'rtp' | 'smartconnection';
  affectedInvoices?: number;
  affectedInvoicesAmount?: number;
  onCardClick?: () => void;
  onButtonClick?: () => void;
  buttonText?: string;
}

export function ExceptionCard({ 
  title, 
  subtitle, 
  count, 
  amount, 
  type, 
  affectedInvoices,
  affectedInvoicesAmount,
  onCardClick,
  onButtonClick,
  buttonText = "View Details"
}: ExceptionCardProps) {
  const getIcon = () => {
    return type === 'rtp' ? <AlertTriangle className="h-4 w-4" style={{ width: 16, height: 16 }} /> : <Link className="h-4 w-4" style={{ width: 16, height: 16 }} />;
  };

  const getColorClasses = () => {
    if (count > 0) {
      return type === 'rtp' 
        ? 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30'
        : 'text-[#7B59FF] bg-[#EFEBFF] border-[#7B59FF]/30';
    }
    return 'text-[#007737] bg-[#007737]/10 border-[#007737]/30';
  };

  const getButtonVariant = () => {
    if (count > 0) {
      return type === 'rtp' ? 'destructive' : 'default';
    }
    return 'outline';
  };

  const getButtonStyles = () => {
    if (count > 0 && type === 'smartconnection') {
      return 'bg-[#7B59FF] hover:bg-[#523BAA] text-white border-[#7B59FF]';
    }
    return '';
  };

  return (
    <Card 
      className={`relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white ${onCardClick ? 'cursor-pointer' : ''}`}
      onClick={onCardClick}
    >
      <CardHeader className="flex flex-row items-center space-y-0 pb-3 gap-3">
        <div className={`p-3 rounded-xl border flex-shrink-0 flex items-center justify-center ${getColorClasses()}`}
             style={{ height: 40, width: 40 }}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold text-[#061237] mb-1">{title}</CardTitle>
          <p className="text-sm text-[#586079]">{subtitle}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[#061237]">{count}</span>
          <span className="text-sm text-[#586079]">
            {type === 'rtp' ? 'exceptions' : 'connections'}
          </span>
        </div>
        
        {type === 'rtp' && amount !== undefined && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-[#E6E7EB]">
            <span className="text-sm font-medium text-[#586079]">Total Amount</span>
            <span className="text-lg font-bold text-[#061237]">
              {formatCurrency(amount, 'USD')}
            </span>
          </div>
        )}
        
        {type === 'smartconnection' && affectedInvoicesAmount !== undefined && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-[#E6E7EB]">
            <span className="text-sm font-medium text-[#586079]">Affected Invoices</span>
            <span className="text-lg font-bold text-[#061237]">{formatCurrency(affectedInvoicesAmount, 'USD')}</span>
          </div>
        )}

        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick?.();
          }}
          variant={getButtonVariant()}
          className={`w-full mt-4 transition-all duration-300 hover:scale-105 ${getButtonStyles()}`}
        >
          {buttonText}
          <ArrowRight className="h-4 w-4 ml-2" style={{ width: 16, height: 16 }} />
        </Button>
      </CardContent>
    </Card>
  );
}
