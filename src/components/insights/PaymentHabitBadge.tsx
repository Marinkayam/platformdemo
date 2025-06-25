
import { Badge } from "@/components/ui/badge";
import { Insight } from "@/types/insights";

interface PaymentHabitBadgeProps {
  paymentHabit: Insight['paymentHabit'];
}

export function PaymentHabitBadge({ paymentHabit }: PaymentHabitBadgeProps) {
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'Excellent':
        return 'bg-[#E6F4EA] text-[#007737] hover:bg-[#E6F4EA]';
      case 'Good':
        return 'bg-[#E3F2FD] text-[#1976D2] hover:bg-[#E3F2FD]';
      case 'Fair':
        return 'bg-[#FFF8E1] text-[#F2AE40] hover:bg-[#FFF8E1]';
      case 'Poor':
        return 'bg-[#FFEBEE] text-[#D32F2F] hover:bg-[#FFEBEE]';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs text-gray-500">
        DSO: {paymentHabit.dso}d | {paymentHabit.terms}
      </div>
      <Badge className={getScoreColor(paymentHabit.score)}>
        {paymentHabit.score}
      </Badge>
    </div>
  );
}
